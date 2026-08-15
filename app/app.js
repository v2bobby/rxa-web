/* ══════════════════════════════════════════════════════════
   RxLoop — app logic
   Everything here is device-local by design. There is no
   backend yet, and the UI never pretends otherwise.

   UPGRADE PATH: to move reports off-device, replace ONLY
   saveReports() / getReports() below with calls to Supabase
   or Firebase. Nothing else in this file needs to change.
   ══════════════════════════════════════════════════════════ */
(function () {
"use strict";

var KEY_REPORTS  = 'rxloop.reports.v1';
var KEY_COURSES  = 'rxloop.courses.v1';
var KEY_LANG     = 'rxloop.lang.v1';

/* ── storage ────────────────────────────────────────────── */
function read(key, fallback) {
  try {
    var raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function write(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); return true; }
  catch (e) { toast('This phone is out of storage space — the report was not saved'); return false; }
}
function getReports()      { return read(KEY_REPORTS, []); }
function saveReports(list) { return write(KEY_REPORTS, list); }
function getCourses()      { return read(KEY_COURSES, []); }
function saveCourses(list) { return write(KEY_COURSES, list); }

/* ── toast ──────────────────────────────────────────────── */
var toastEl = document.getElementById('toast'), toastT;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 3400);
}

/* ── language ───────────────────────────────────────────── */
var lang = read(KEY_LANG, 'en');
if (!RX.UI[lang]) lang = 'en';
var langSel = document.getElementById('langSel');

RX.LANGS.forEach(function (L) {
  var o = document.createElement('option');
  o.value = L.id;
  o.textContent = L.label;
  if (L.id === lang) o.selected = true;
  langSel.appendChild(o);
});
langSel.addEventListener('change', function () {
  lang = langSel.value;
  write(KEY_LANG, lang);
  applyLang();
  renderList();
  if (current) renderDetail(current);
});

function ui() { return RX.UI[lang] || RX.UI.en; }

function applyLang() {
  var u = ui();
  document.getElementById('search').placeholder = u.search;
  document.getElementById('search').setAttribute('aria-label', u.search);
  document.querySelectorAll('[data-ui]').forEach(function (el) {
    var k = el.dataset.ui;
    if (u[k]) el.textContent = u[k];
  });
}

/* ── tabs ───────────────────────────────────────────────── */
document.querySelectorAll('.tabbar button').forEach(function (b) {
  b.addEventListener('click', function () {
    document.querySelectorAll('.tabbar button').forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
    document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('on'); });
    document.getElementById('v-' + b.dataset.v).classList.add('on');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

/* ══════════════════════════════════════════════════════════
   MEDICINES
   ══════════════════════════════════════════════════════════ */
var listPane   = document.getElementById('listPane'),
    detailPane = document.getElementById('detailPane'),
    detailBody = document.getElementById('detailBody'),
    applist    = document.getElementById('applist'),
    search     = document.getElementById('search'),
    current    = null;

function matches(m, q) {
  if (!q) return true;
  q = q.toLowerCase();
  if (m.name.toLowerCase().indexOf(q) > -1) return true;
  if (m.gen.toLowerCase().indexOf(q) > -1) return true;
  return (m.tags || []).some(function (t) { return t.indexOf(q) > -1; });
}

function renderList() {
  var q = search.value.trim();
  var hits = RX.MEDS.filter(function (m) { return matches(m, q); });
  applist.innerHTML = '';
  if (!hits.length) {
    var e = document.createElement('div');
    e.className = 'ledger-empty';
    e.textContent = 'No medicine here matches that yet. The reference set is small and growing — ask your pharmacist in the meantime.';
    applist.appendChild(e);
    return;
  }
  hits.forEach(function (m) {
    var b = document.createElement('button');
    b.className = 'medbtn';
    b.type = 'button';
    var nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = m.name;
    var sub = document.createElement('span'); sub.className = 'sub'; sub.textContent = m.gen;
    b.appendChild(nm); b.appendChild(sub);
    b.addEventListener('click', function () { openDetail(m); });
    applist.appendChild(b);
  });
}
search.addEventListener('input', renderList);

function field(k, v) {
  var d = document.createElement('div'); d.className = 'fld';
  var kk = document.createElement('div'); kk.className = 'k mono'; kk.textContent = k;
  var vv = document.createElement('div'); vv.className = 'v'; vv.textContent = v;
  d.appendChild(kk); d.appendChild(vv);
  return d;
}

function renderDetail(m) {
  var t = m[lang] || m.en, u = ui();
  detailBody.innerHTML = '';
  var h = document.createElement('h3');
  h.style.cssText = "font-family:var(--display);font-weight:800;font-stretch:108%;text-transform:uppercase;font-size:30px;line-height:.92;letter-spacing:-.035em;margin:0 0 6px";
  h.textContent = m.name;
  var g = document.createElement('div'); g.className = 'gen'; g.textContent = m.gen;
  detailBody.appendChild(h);
  detailBody.appendChild(g);
  detailBody.appendChild(field(u.f1, t.f1));
  detailBody.appendChild(field(u.f2, t.f2));
  detailBody.appendChild(field(u.f3, t.f3));

  var foot = document.createElement('div'); foot.className = 'medfoot';
  var off = document.createElement('span'); off.className = 'offline-tag mono';
  off.textContent = '\u25C6 ' + u.offline;
  var note = document.createElement('span'); note.className = 'pill-note';
  var dot = document.createElement('span'); dot.className = 'd';
  note.appendChild(dot);
  note.appendChild(document.createTextNode(lang === 'en' ? u.nodose : u.draft));
  foot.appendChild(off); foot.appendChild(note);
  detailBody.appendChild(foot);
}

function openDetail(m) {
  current = m;
  renderDetail(m);
  listPane.classList.add('hidden');
  detailPane.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.getElementById('backBtn').addEventListener('click', function () {
  current = null;
  detailPane.classList.add('hidden');
  listPane.classList.remove('hidden');
});

/* ══════════════════════════════════════════════════════════
   REPORTS
   ══════════════════════════════════════════════════════════ */
var form       = document.getElementById('reportForm'),
    ledgerBody = document.getElementById('ledgerBody'),
    checks     = document.getElementById('flagChecks'),
    stateSel   = document.getElementById('a-state');

RX.STATES.forEach(function (s) {
  var o = document.createElement('option'); o.textContent = s; stateSel.appendChild(o);
});
RX.FLAGS.forEach(function (f) {
  var l = document.createElement('label'); l.className = 'check';
  var inp = document.createElement('input'); inp.type = 'checkbox'; inp.value = f;
  var bx = document.createElement('span'); bx.className = 'bx';
  l.appendChild(inp); l.appendChild(bx);
  l.appendChild(document.createTextNode(f));
  checks.appendChild(l);
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var flags = [].slice.call(form.querySelectorAll('input[type=checkbox]:checked')).map(function (c) { return c.value; });
  var photo = document.getElementById('a-photo').files[0];

  var rec = {
    ref: 'RX-' + Math.random().toString(36).slice(2, 7).toUpperCase(),
    med: form.med.value.trim() || 'Unnamed medicine',
    batch: form.batch.value.trim(),
    where: form.where.value.trim(),
    state: form.state.value,
    flags: flags,
    photoName: photo ? photo.name : '',
    at: new Date().toISOString()
  };

  var list = getReports();
  list.unshift(rec);
  if (saveReports(list)) {
    renderLedger();
    form.reset();
    form.querySelectorAll('input[type=checkbox]').forEach(function (c) { c.checked = false; });
    toast('Report ' + rec.ref + ' saved on this phone');
  }
});

function renderLedger() {
  var list = getReports();
  ledgerBody.innerHTML = '';
  if (!list.length) {
    var e = document.createElement('div');
    e.className = 'ledger-empty';
    e.textContent = 'Nothing reported yet. If a pack ever looks wrong, log it here — the reference code is yours to quote.';
    ledgerBody.appendChild(e);
    return;
  }
  list.forEach(function (r) {
    var row = document.createElement('div'); row.className = 'rec';
    var ref = document.createElement('span'); ref.className = 'ref mono'; ref.textContent = r.ref;
    var meta = document.createElement('div'); meta.className = 'meta';
    var b = document.createElement('b'); b.textContent = r.med;
    var small = document.createElement('small');
    var bits = [];
    if (r.batch) bits.push('Batch ' + r.batch);
    if (r.where) bits.push(r.where);
    bits.push(r.state);
    bits.push(new Date(r.at).toLocaleDateString());
    if (r.flags && r.flags.length) bits.push(r.flags.length + ' flag' + (r.flags.length > 1 ? 's' : ''));
    small.textContent = bits.join(' \u00B7 ');
    meta.appendChild(b); meta.appendChild(small);
    var st = document.createElement('span'); st.className = 'st'; st.textContent = 'Unverified';
    row.appendChild(ref); row.appendChild(meta); row.appendChild(st);
    ledgerBody.appendChild(row);
  });
}

document.getElementById('exportBtn').addEventListener('click', function () {
  var list = getReports();
  if (!list.length) { toast('No reports to export yet'); return; }
  var blob = new Blob([JSON.stringify(list, null, 2)], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'rxloop-reports.json';
  a.click();
  setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  toast('Exported ' + list.length + ' report' + (list.length > 1 ? 's' : ''));
});

document.getElementById('clearBtn').addEventListener('click', function () {
  if (!getReports().length) { toast('Nothing to clear'); return; }
  if (confirm('Delete every report saved on this phone? This cannot be undone.')) {
    saveReports([]);
    renderLedger();
    toast('All reports deleted');
  }
});

/* ══════════════════════════════════════════════════════════
   REMINDERS
   Local only. setTimeout survives while the page lives; on
   reopen, courses are rescheduled from stored times.
   ══════════════════════════════════════════════════════════ */
var SLOTS = ['06:00', '08:00', '12:00', '14:00', '18:00', '20:00', '22:00'];
var chosen = ['08:00', '14:00', '20:00'];
var timeSet    = document.getElementById('timeSet'),
    timeline   = document.getElementById('timeline'),
    summary    = document.getElementById('doseSummary'),
    courseBody = document.getElementById('courseBody'),
    courseCount= document.getElementById('courseCount');

SLOTS.forEach(function (s) {
  var b = document.createElement('button');
  b.className = 'tbtn';
  b.type = 'button';
  b.textContent = s;
  b.setAttribute('aria-pressed', String(chosen.indexOf(s) > -1));
  b.addEventListener('click', function () {
    var i = chosen.indexOf(s);
    if (i > -1) chosen.splice(i, 1); else chosen.push(s);
    b.setAttribute('aria-pressed', String(chosen.indexOf(s) > -1));
    renderTimeline();
  });
  timeSet.appendChild(b);
});

function renderTimeline() {
  timeline.innerHTML = '';
  var hours = document.createElement('div');
  hours.className = 'tl-hours';
  for (var h = 0; h < 24; h += 3) {
    var s = document.createElement('span');
    s.textContent = (h < 10 ? '0' : '') + h + ':00';
    hours.appendChild(s);
  }
  timeline.appendChild(hours);

  chosen.slice().sort().forEach(function (tm) {
    var p = tm.split(':'), mins = (+p[0]) * 60 + (+p[1]);
    var d = document.createElement('div');
    d.className = 'dose';
    d.style.left = (mins / 1440 * 100) + '%';
    d.setAttribute('data-t', tm);
    timeline.appendChild(d);
  });

  var now = new Date(), nowMin = now.getHours() * 60 + now.getMinutes();
  var nl = document.createElement('div');
  nl.className = 'now-line';
  nl.style.left = (nowMin / 1440 * 100) + '%';
  timeline.appendChild(nl);

  var sorted = chosen.slice().sort();
  var next = sorted.filter(function (tm) {
    var p = tm.split(':');
    return (+p[0]) * 60 + (+p[1]) > nowMin;
  })[0];
  summary.textContent = chosen.length
    ? chosen.length + ' doses/day \u00B7 next ' + (next || (sorted[0] + ' tomorrow'))
    : 'No doses set';
}
renderTimeline();

document.getElementById('courseForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var med = document.getElementById('c-med').value.trim();
  var days = Math.max(1, Math.min(90, +document.getElementById('c-days').value || 5));
  if (!med) return;
  if (!chosen.length) { toast('Pick at least one dose time'); return; }

  var list = getCourses();
  list.unshift({
    id: 'c' + Date.now(),
    med: med,
    days: days,
    times: chosen.slice().sort(),
    start: new Date().toISOString()
  });
  if (saveCourses(list)) {
    renderCourses();
    scheduleAll();
    document.getElementById('c-med').value = '';
    toast('Reminders set for ' + med);
  }
});

function renderCourses() {
  var list = getCourses();
  courseCount.textContent = String(list.length);
  courseBody.innerHTML = '';
  if (!list.length) {
    var e = document.createElement('div');
    e.className = 'ledger-empty';
    e.textContent = 'No courses yet. Add one and the dose times will show on the bar above.';
    courseBody.appendChild(e);
    return;
  }
  list.forEach(function (c) {
    var elapsed = Math.floor((Date.now() - new Date(c.start).getTime()) / 86400000);
    var left = Math.max(0, c.days - elapsed);
    var row = document.createElement('div'); row.className = 'rec';
    var ref = document.createElement('span'); ref.className = 'ref mono'; ref.textContent = left + 'd';
    var meta = document.createElement('div'); meta.className = 'meta';
    var b = document.createElement('b'); b.textContent = c.med;
    var small = document.createElement('small');
    small.textContent = c.times.join(' \u00B7 ') + (left ? ' \u00B7 ' + left + ' days left' : ' \u00B7 course complete');
    meta.appendChild(b); meta.appendChild(small);
    var del = document.createElement('button');
    del.className = 'link-btn';
    del.type = 'button';
    del.textContent = 'Remove';
    del.addEventListener('click', function () {
      saveCourses(getCourses().filter(function (x) { return x.id !== c.id; }));
      renderCourses();
      scheduleAll();
    });
    row.appendChild(ref); row.appendChild(meta); row.appendChild(del);
    courseBody.appendChild(row);
  });
}

var timers = [];
function scheduleAll() {
  timers.forEach(clearTimeout);
  timers = [];
  getCourses().forEach(function (c) {
    var elapsed = Math.floor((Date.now() - new Date(c.start).getTime()) / 86400000);
    if (elapsed >= c.days) return;
    c.times.forEach(function (tm) {
      var p = tm.split(':');
      var when = new Date();
      when.setHours(+p[0], +p[1], 0, 0);
      if (when.getTime() <= Date.now()) return;      // today's slot already passed
      var delay = when.getTime() - Date.now();
      if (delay > 2147483647) return;                // beyond setTimeout's range
      timers.push(setTimeout(function () { fire(c.med); }, delay));
    });
  });
}

function fire(med) {
  var line = 'Time for ' + med + '. Take it with water.';
  if ('Notification' in window && Notification.permission === 'granted') {
    try { new Notification('RxLoop', { body: line, icon: '/app/icons/icon-192.png', tag: 'rxloop-dose' }); return; }
    catch (e) { /* fall through to toast */ }
  }
  toast(line);
}

document.getElementById('permBtn').addEventListener('click', function () {
  if (!('Notification' in window)) { toast('This browser has no notifications — RxLoop will show an in-app alert instead'); return; }
  if (Notification.permission === 'granted') { fire(document.getElementById('c-med').value.trim() || 'your medicine'); return; }
  if (Notification.permission === 'denied') { toast('Notifications are blocked in your browser settings — RxLoop will show an in-app alert instead'); return; }
  Notification.requestPermission().then(function (p) {
    toast(p === 'granted' ? 'Reminders will now show as notifications' : 'RxLoop will show an in-app alert instead');
  });
});

/* ══════════════════════════════════════════════════════════
   NETWORK STATUS · INSTALL · SERVICE WORKER
   ══════════════════════════════════════════════════════════ */
var netEl = document.getElementById('net'), netTxt = document.getElementById('netTxt');
function netState() {
  var on = navigator.onLine;
  netEl.classList.toggle('off', !on);
  netTxt.textContent = on ? 'Online' : 'Offline \u2014 still working';
}
addEventListener('online', netState);
addEventListener('offline', netState);
netState();

var deferred = null;
var installBar = document.getElementById('installBar');
addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault();
  deferred = e;
  installBar.classList.remove('hidden');
});
document.getElementById('installBtn').addEventListener('click', function () {
  if (!deferred) return;
  deferred.prompt();
  deferred.userChoice.then(function () {
    deferred = null;
    installBar.classList.add('hidden');
  });
});
addEventListener('appinstalled', function () {
  installBar.classList.add('hidden');
  toast('RxLoop installed — it now opens without a browser');
});

if ('serviceWorker' in navigator) {
  addEventListener('load', function () {
    navigator.serviceWorker.register('/app/service-worker.js').catch(function () {
      /* registration needs https or localhost; silence is correct here */
    });
  });
}

/* ── boot ───────────────────────────────────────────────── */
applyLang();
renderList();
renderLedger();
renderCourses();
scheduleAll();

})();
