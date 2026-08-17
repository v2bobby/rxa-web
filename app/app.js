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

var KEY_REPORTS = 'rxloop.reports.v1';
var KEY_COURSES = 'rxloop.courses.v2';   // v2 adds the taken[] dose log
var KEY_LANG    = 'rxloop.lang.v1';
var KEY_SEEN    = 'rxloop.seen.v1';

var VIEWS = ['medicines', 'report', 'reminders'];

/* ── storage ────────────────────────────────────────────── */
function read(key, fallback) {
  try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch (e) { return fallback; }
}
function write(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); return true; }
  catch (e) { toast('This phone is out of storage space — nothing was saved'); return false; }
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
var lang = read(KEY_LANG, null);
var langSel = document.getElementById('langSel');
var gate = document.getElementById('gate'), gateOpts = document.getElementById('gateOpts');

RX.LANGS.forEach(function (L) {
  var o = document.createElement('option');
  o.value = L.id;
  o.textContent = L.native;
  langSel.appendChild(o);

  var b = document.createElement('button');
  b.className = 'gatebtn';
  b.type = 'button';
  var n = document.createElement('span'); n.textContent = L.native;
  var s = document.createElement('span'); s.className = 'sm'; s.textContent = L.id;
  b.appendChild(n); b.appendChild(s);
  b.addEventListener('click', function () { setLang(L.id); closeGate(); });
  gateOpts.appendChild(b);
});

function setLang(id) {
  lang = RX.UI[id] ? id : 'en';
  langSel.value = lang;
  write(KEY_LANG, lang);
  applyLang();
  renderList();
  if (current) renderDetail(current);
}
langSel.addEventListener('change', function () { setLang(langSel.value); });

function closeGate() {
  gate.classList.add('hidden');
  write(KEY_SEEN, true);
  document.getElementById('search').focus();
}
if (!lang || !read(KEY_SEEN, false)) {
  gate.classList.remove('hidden');
  lang = lang || 'en';
} 
langSel.value = lang;

function ui() { return RX.UI[lang] || RX.UI.en; }

function applyLang() {
  var u = ui();
  var s = document.getElementById('search');
  s.placeholder = u.search;
  s.setAttribute('aria-label', u.search);
  document.querySelectorAll('[data-ui]').forEach(function (el) {
    if (u[el.dataset.ui]) el.textContent = u[el.dataset.ui];
  });
  document.getElementById('backTxt').textContent = u.learn;
  document.documentElement.lang = lang === 'pcm' ? 'en' : lang;
}

/* ══════════════════════════════════════════════════════════
   ROUTING
   Hash-driven so the manifest shortcuts, the back button and
   deep links all land on the right tab.
   ══════════════════════════════════════════════════════════ */
var tabs = [].slice.call(document.querySelectorAll('.tabbar button'));

function show(view, push) {
  if (VIEWS.indexOf(view) < 0) view = 'medicines';
  tabs.forEach(function (b) {
    var on = b.dataset.v === view;
    b.setAttribute('aria-selected', String(on));
    b.tabIndex = on ? 0 : -1;
  });
  VIEWS.forEach(function (v) {
    document.getElementById('v-' + v).classList.toggle('on', v === view);
  });
  if (push && location.hash !== '#' + view) location.hash = view;
  if (view === 'reminders') renderCourses();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabs.forEach(function (b, i) {
  b.addEventListener('click', function () { show(b.dataset.v, true); });
  /* arrow keys move between tabs, as a tablist should */
  b.addEventListener('keydown', function (e) {
    var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    var next = tabs[(i + d + tabs.length) % tabs.length];
    next.focus();
    show(next.dataset.v, true);
  });
});
addEventListener('hashchange', function () { show(location.hash.replace('#', ''), false); });

/* ══════════════════════════════════════════════════════════
   MEDICINES
   ══════════════════════════════════════════════════════════ */
var listPane   = document.getElementById('listPane'),
    detailPane = document.getElementById('detailPane'),
    detailBody = document.getElementById('detailBody'),
    applist    = document.getElementById('applist'),
    search     = document.getElementById('search'),
    quickchips = document.getElementById('quickchips'),
    current    = null,
    filter     = null;

/* Conditions, not drug classes — people search for what is wrong
   with them, not for a pharmacological category. */
var CONDITIONS = [
  { id: 'fever',    label: 'Fever & pain',    match: ['fever', 'pain', 'headache'] },
  { id: 'malaria',  label: 'Malaria',         match: ['malaria'] },
  { id: 'infect',   label: 'Infection',       match: ['antibiotic', 'infection'] },
  { id: 'diarr',    label: 'Diarrhoea',       match: ['diarrhoea', 'dehydration'] },
  { id: 'bp',       label: 'Blood pressure',  match: ['blood pressure', 'hypertension', 'bp'] },
  { id: 'sugar',    label: 'Diabetes',        match: ['diabetes', 'sugar'] },
  { id: 'anaemia',  label: 'Anaemia & pregnancy', match: ['anaemia', 'pregnancy', 'iron'] },
  { id: 'asthma',   label: 'Asthma',          match: ['asthma', 'breathing', 'inhaler'] },
  { id: 'tb',       label: 'TB',              match: ['tb', 'tuberculosis'] },
  { id: 'hiv',      label: 'HIV',             match: ['hiv', 'art', 'arv'] },
  { id: 'opioid',   label: 'Strong painkillers', match: ['opioid', 'dependence', 'tramadol'] }
];

CONDITIONS.forEach(function (c) {
  var b = document.createElement('button');
  b.className = 'qchip';
  b.type = 'button';
  b.textContent = c.label;
  b.setAttribute('aria-pressed', 'false');
  b.addEventListener('click', function () {
    filter = filter === c.id ? null : c.id;
    quickchips.querySelectorAll('.qchip').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
    b.setAttribute('aria-pressed', String(filter === c.id));
    renderList();
  });
  quickchips.appendChild(b);
});

function matchesQuery(m, q) {
  if (!q) return true;
  q = q.toLowerCase();
  if (m.name.toLowerCase().indexOf(q) > -1) return true;
  if (m.gen.toLowerCase().indexOf(q) > -1) return true;
  return (m.tags || []).some(function (t) { return t.indexOf(q) > -1; });
}
function matchesFilter(m) {
  if (!filter) return true;
  var c = CONDITIONS.filter(function (x) { return x.id === filter; })[0];
  var hay = (m.tags || []).concat([m.gen.toLowerCase()]);
  /* Whole-word match only. A substring test makes "art" hit
     ARTemether and heART, which put the wrong drugs under HIV. */
  return c.match.some(function (term) {
    var re = new RegExp('(^|[^a-z])' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z]|$)');
    return hay.some(function (t) { return re.test(t); });
  });
}

function renderList() {
  var q = search.value.trim();
  var hits = RX.MEDS.filter(function (m) { return matchesQuery(m, q) && matchesFilter(m); });
  applist.innerHTML = '';
  if (!hits.length) {
    var e = document.createElement('div');
    e.className = 'empty-cta';
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

function field(k, v, urgent) {
  var d = document.createElement('div'); d.className = 'fld' + (urgent ? ' urgent' : '');
  var kk = document.createElement('div'); kk.className = 'k mono'; kk.textContent = k;
  var vv = document.createElement('div'); vv.className = 'v'; vv.textContent = v;
  d.appendChild(kk); d.appendChild(vv);
  return d;
}

function renderDetail(m) {
  var t = m[lang] || m.en, u = ui();
  detailBody.innerHTML = '';

  var h = document.createElement('h3'); h.textContent = m.name;
  var g = document.createElement('div'); g.className = 'gen'; g.textContent = m.gen;
  detailBody.appendChild(h);
  detailBody.appendChild(g);
  detailBody.appendChild(field(u.f1, t.f1));
  detailBody.appendChild(field(u.f2, t.f2));
  detailBody.appendChild(field(u.f3, t.f3, true));   // "get help" gets the red rail

  var foot = document.createElement('div'); foot.className = 'medfoot';
  var off = document.createElement('span'); off.className = 'offline-tag mono';
  off.textContent = u.offline;
  var note = document.createElement('span'); note.className = 'pill-note';
  var dot = document.createElement('span'); dot.className = 'd';
  note.appendChild(dot);
  note.appendChild(document.createTextNode(lang === 'en' ? u.nodose : u.draft));
  foot.appendChild(off); foot.appendChild(note);
  detailBody.appendChild(foot);

  /* The three tabs are one workflow, so wire them together:
     reading about a medicine is exactly when you want to set a
     reminder for it or flag the pack it came in. */
  var x = document.createElement('div'); x.className = 'xlinks';

  var remind = document.createElement('button');
  remind.className = 'btn sm';
  remind.type = 'button';
  remind.textContent = 'Set a reminder for this';
  remind.addEventListener('click', function () {
    document.getElementById('c-med').value = m.name;
    document.getElementById('addCourse').open = true;
    show('reminders', true);
    setTimeout(function () { document.getElementById('c-days').focus(); }, 260);
  });

  var flagIt = document.createElement('button');
  flagIt.className = 'btn ghost sm';
  flagIt.type = 'button';
  flagIt.textContent = 'Report a bad pack';
  flagIt.addEventListener('click', function () {
    document.getElementById('a-med').value = m.name;
    show('report', true);
    setTimeout(function () { document.getElementById('a-batch').focus(); }, 260);
  });

  x.appendChild(remind);
  x.appendChild(flagIt);
  detailBody.appendChild(x);
}

function openDetail(m) {
  current = m;
  renderDetail(m);
  listPane.classList.add('hidden');
  detailPane.classList.remove('hidden');
  document.getElementById('backBtn').focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.getElementById('backBtn').addEventListener('click', function () {
  current = null;
  detailPane.classList.add('hidden');
  listPane.classList.remove('hidden');
  search.focus();
});

/* ══════════════════════════════════════════════════════════
   REPORTS
   ══════════════════════════════════════════════════════════ */
var form       = document.getElementById('reportForm'),
    ledgerBody = document.getElementById('ledgerBody'),
    checks     = document.getElementById('flagChecks'),
    stateSel   = document.getElementById('a-state'),
    photoIn    = document.getElementById('a-photo'),
    photoPrev  = document.getElementById('photoPrev'),
    photoTxt   = document.getElementById('photoTxt'),
    repBadge   = document.getElementById('repBadge');

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

/* Downscale before storing: a phone camera JPEG is several MB and
   localStorage caps around 5. 480px is enough to read a batch code. */
var pendingThumb = null;
function makeThumb(file, done) {
  var url = URL.createObjectURL(file);
  var img = new Image();
  img.onload = function () {
    var max = 480, scale = Math.min(1, max / Math.max(img.width, img.height));
    var c = document.createElement('canvas');
    c.width = Math.round(img.width * scale);
    c.height = Math.round(img.height * scale);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    URL.revokeObjectURL(url);
    try { done(c.toDataURL('image/jpeg', 0.6)); }
    catch (e) { done(null); }
  };
  img.onerror = function () { URL.revokeObjectURL(url); done(null); };
  img.src = url;
}

photoIn.addEventListener('change', function () {
  var f = photoIn.files[0];
  if (!f) { pendingThumb = null; return; }
  makeThumb(f, function (dataUrl) {
    pendingThumb = dataUrl;
    if (dataUrl) {
      photoPrev.innerHTML = '';
      var im = document.createElement('img');
      im.src = dataUrl;
      im.alt = '';
      photoPrev.appendChild(im);
      photoTxt.textContent = 'Photo attached. It stays on this phone.';
    }
  });
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var flags = [].slice.call(form.querySelectorAll('input[type=checkbox]:checked')).map(function (c) { return c.value; });
  var rec = {
    ref: 'RX-' + Math.random().toString(36).slice(2, 7).toUpperCase(),
    med: form.med.value.trim() || 'Unnamed medicine',
    batch: form.batch.value.trim(),
    where: form.where.value.trim(),
    state: form.state.value,
    flags: flags,
    thumb: pendingThumb || '',
    at: new Date().toISOString()
  };

  var list = getReports();
  list.unshift(rec);
  if (saveReports(list)) {
    renderLedger();
    form.reset();
    form.querySelectorAll('input[type=checkbox]').forEach(function (c) { c.checked = false; });
    pendingThumb = null;
    photoPrev.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8h3l2-2h8l2 2h3v11H3z"/><circle cx="12" cy="13" r="3.5"/></svg>';
    photoTxt.textContent = 'Take a photo of the carton and blister. Stored on this phone only.';
    toast('Report ' + rec.ref + ' saved on this phone');
  }
});

function renderLedger() {
  var list = getReports();
  ledgerBody.innerHTML = '';
  repBadge.textContent = String(list.length);
  repBadge.classList.toggle('hidden', !list.length);

  if (!list.length) {
    var e = document.createElement('div');
    e.className = 'empty-cta';
    e.textContent = 'Nothing reported yet. If a pack ever looks wrong, log it here — the reference code is yours to quote.';
    ledgerBody.appendChild(e);
    return;
  }

  list.forEach(function (r) {
    var row = document.createElement('div'); row.className = 'rec';

    var ref = document.createElement('button');
    ref.className = 'ref mono link-btn';
    ref.type = 'button';
    ref.style.borderBottom = '0';
    ref.textContent = r.ref;
    ref.title = 'Copy reference code';
    ref.addEventListener('click', function () {
      if (navigator.clipboard) navigator.clipboard.writeText(r.ref).then(function () { toast('Copied ' + r.ref); });
      else toast(r.ref);
    });

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

    var del = document.createElement('button');
    del.className = 'link-btn';
    del.type = 'button';
    del.textContent = 'Delete';
    del.addEventListener('click', function () {
      saveReports(getReports().filter(function (x) { return x.ref !== r.ref; }));
      renderLedger();
      toast('Report ' + r.ref + ' deleted');
    });

    row.appendChild(ref); row.appendChild(meta); row.appendChild(del);

    if ((r.flags && r.flags.length) || r.thumb) {
      var more = document.createElement('div'); more.className = 'rec-more';
      if (r.thumb) {
        var im = document.createElement('img');
        im.className = 'thumb';
        im.src = r.thumb;
        im.alt = 'Photo attached to report ' + r.ref;
        more.appendChild(im);
      }
      if (r.flags && r.flags.length) {
        var ul = document.createElement('ul');
        r.flags.forEach(function (f) {
          var li = document.createElement('li'); li.textContent = f; ul.appendChild(li);
        });
        more.appendChild(ul);
      }
      row.classList.add('open');
      row.appendChild(more);
    }
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
   Local only. Doses are logged per day so a course shows real
   adherence rather than just a schedule.
   ══════════════════════════════════════════════════════════ */
var SLOTS = ['06:00', '08:00', '12:00', '14:00', '18:00', '20:00', '22:00'];
var chosen = ['08:00', '14:00', '20:00'];
var timeSet     = document.getElementById('timeSet'),
    timeline    = document.getElementById('timeline'),
    summary     = document.getElementById('doseSummary'),
    courseBody  = document.getElementById('courseBody'),
    courseCount = document.getElementById('courseCount'),
    nextWrap    = document.getElementById('nextWrap'),
    remBadge    = document.getElementById('remBadge');

function today() {
  var d = new Date();
  return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
}
function minsOf(t) { var p = t.split(':'); return (+p[0]) * 60 + (+p[1]); }
function nowMins() { var d = new Date(); return d.getHours() * 60 + d.getMinutes(); }

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
    var d = document.createElement('div');
    d.className = 'dose';
    d.style.left = (minsOf(tm) / 1440 * 100) + '%';
    d.setAttribute('data-t', tm);
    timeline.appendChild(d);
  });

  var nl = document.createElement('div');
  nl.className = 'now-line';
  nl.style.left = (nowMins() / 1440 * 100) + '%';
  timeline.appendChild(nl);

  var sorted = chosen.slice().sort();
  var next = sorted.filter(function (tm) { return minsOf(tm) > nowMins(); })[0];
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
    start: new Date().toISOString(),
    taken: {}
  });
  if (saveCourses(list)) {
    renderCourses();
    scheduleAll();
    document.getElementById('c-med').value = '';
    document.getElementById('addCourse').open = false;
    toast('Reminders set for ' + med);
  }
});

function dayIndex(c) {
  var start = new Date(c.start);
  start.setHours(0, 0, 0, 0);
  return Math.floor((Date.now() - start.getTime()) / 86400000);
}
function isTaken(c, tm) { return !!(c.taken && c.taken[today() + '|' + tm]); }

function markTaken(id, tm) {
  var list = getCourses();
  list.forEach(function (c) {
    if (c.id !== id) return;
    c.taken = c.taken || {};
    var k = today() + '|' + tm;
    if (c.taken[k]) delete c.taken[k]; else c.taken[k] = new Date().toISOString();
  });
  saveCourses(list);
  renderCourses();
}

function renderNext() {
  nextWrap.innerHTML = '';
  var list = getCourses().filter(function (c) { return dayIndex(c) < c.days; });
  if (!list.length) return;

  var best = null;
  list.forEach(function (c) {
    c.times.forEach(function (tm) {
      if (isTaken(c, tm)) return;
      var delta = minsOf(tm) - nowMins();
      var when = delta >= 0 ? delta : delta + 1440;      // wraps to tomorrow
      if (!best || when < best.when) best = { c: c, tm: tm, when: when, overdue: delta < 0 && delta > -240 };
    });
  });
  if (!best) return;

  var card = document.createElement('div'); card.className = 'nextdose';
  var k = document.createElement('div'); k.className = 'k';
  k.textContent = best.overdue ? 'Overdue' : 'Next dose';
  var t = document.createElement('div'); t.className = 't'; t.textContent = best.tm;
  var m = document.createElement('div'); m.className = 'm';
  var h = Math.floor(best.when / 60), mm = best.when % 60;
  m.textContent = best.c.med + ' \u00B7 ' + (best.overdue
    ? 'was due earlier today'
    : (h ? 'in ' + h + 'h ' + mm + 'm' : 'in ' + mm + ' minutes'));

  var act = document.createElement('div'); act.className = 'act';
  var take = document.createElement('button');
  take.className = 'btn sm';
  take.type = 'button';
  take.textContent = 'Mark as taken';
  take.addEventListener('click', function () {
    markTaken(best.c.id, best.tm);
    toast('Logged ' + best.tm + ' \u00B7 ' + best.c.med);
  });
  act.appendChild(take);

  card.appendChild(k); card.appendChild(t); card.appendChild(m); card.appendChild(act);
  nextWrap.appendChild(card);
}

function renderCourses() {
  var list = getCourses();
  courseCount.textContent = String(list.length);
  remBadge.textContent = String(list.length);
  remBadge.classList.toggle('hidden', !list.length);
  courseBody.innerHTML = '';

  if (!list.length) {
    var e = document.createElement('div');
    e.className = 'empty-cta';
    e.textContent = 'No courses yet. Add one and each dose appears here to tick off as you take it.';
    courseBody.appendChild(e);
    renderNext();
    return;
  }

  list.forEach(function (c) {
    var di = dayIndex(c);
    var left = Math.max(0, c.days - di);
    var totalDoses = c.days * c.times.length;
    var takenCount = Object.keys(c.taken || {}).length;
    var pct = totalDoses ? Math.min(100, Math.round(takenCount / totalDoses * 100)) : 0;

    var row = document.createElement('div'); row.className = 'course';

    var head = document.createElement('div'); head.className = 'course-h';
    var b = document.createElement('b'); b.textContent = c.med;
    var lf = document.createElement('span'); lf.className = 'left';
    lf.textContent = left ? left + ' days left' : 'complete';
    head.appendChild(b); head.appendChild(lf);

    var bar = document.createElement('div'); bar.className = 'bar';
    var i = document.createElement('i'); i.style.width = pct + '%';
    bar.appendChild(i);

    var foot = document.createElement('div'); foot.className = 'course-f';
    var doses = document.createElement('div'); doses.className = 'doses';
    c.times.forEach(function (tm) {
      var chip = document.createElement('button');
      chip.className = 'dosechip';
      chip.type = 'button';
      chip.textContent = tm;
      chip.dataset.taken = String(isTaken(c, tm));
      chip.dataset.past = String(minsOf(tm) < nowMins());
      if (left === 0) chip.disabled = true;
      chip.setAttribute('aria-label', tm + (isTaken(c, tm) ? ' taken' : ' not taken') + ' — ' + c.med);
      chip.addEventListener('click', function () { markTaken(c.id, tm); });
      doses.appendChild(chip);
    });

    var right = document.createElement('div');
    right.style.cssText = 'display:flex;gap:14px;align-items:center';
    var stat = document.createElement('span'); stat.className = 'times';
    stat.textContent = takenCount + '/' + totalDoses + ' doses';
    var del = document.createElement('button');
    del.className = 'link-btn';
    del.type = 'button';
    del.textContent = 'Remove';
    del.addEventListener('click', function () {
      saveCourses(getCourses().filter(function (x) { return x.id !== c.id; }));
      renderCourses();
      scheduleAll();
    });
    right.appendChild(stat); right.appendChild(del);

    foot.appendChild(doses); foot.appendChild(right);
    row.appendChild(head); row.appendChild(bar); row.appendChild(foot);
    courseBody.appendChild(row);
  });

  renderNext();
}

var timers = [];
function scheduleAll() {
  timers.forEach(clearTimeout);
  timers = [];
  getCourses().forEach(function (c) {
    if (dayIndex(c) >= c.days) return;
    c.times.forEach(function (tm) {
      var p = tm.split(':');
      var when = new Date();
      when.setHours(+p[0], +p[1], 0, 0);
      var delay = when.getTime() - Date.now();
      if (delay <= 0 || delay > 2147483647) return;   // past, or beyond setTimeout range
      timers.push(setTimeout(function () { fire(c.med, tm); }, delay));
    });
  });
}

function fire(med, tm) {
  var line = 'Time for ' + med + '. Take it with water.';
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification('RxLoop \u00B7 ' + tm, { body: line, icon: 'icons/icon-192.png', tag: 'rxloop-' + tm });
      renderCourses();
      return;
    } catch (e) { /* fall through */ }
  }
  toast(line);
  renderCourses();
}

document.getElementById('permBtn').addEventListener('click', function () {
  if (!('Notification' in window)) { toast('This browser has no notifications — RxLoop will show an in-app alert instead'); return; }
  if (Notification.permission === 'granted') { fire('your medicine', 'now'); return; }
  if (Notification.permission === 'denied') { toast('Notifications are blocked in your browser settings — RxLoop will show an in-app alert instead'); return; }
  Notification.requestPermission().then(function (p) {
    toast(p === 'granted' ? 'Reminders will now show as notifications' : 'RxLoop will show an in-app alert instead');
  });
});

/* keep the countdown and the now-line honest */
setInterval(function () {
  if (document.getElementById('v-reminders').classList.contains('on')) {
    renderNext();
    renderTimeline();
  }
}, 30000);

/* ══════════════════════════════════════════════════════════
   SHELL: scroll state, network, install, service worker
   ══════════════════════════════════════════════════════════ */
var appTop = document.getElementById('appTop');
addEventListener('scroll', function () {
  appTop.classList.toggle('compact', scrollY > 24);
}, { passive: true });

var netEl  = document.getElementById('net'),
    netTxt = document.getElementById('netTxt'),
    offbar = document.getElementById('offbar');
function netState() {
  var on = navigator.onLine;
  netEl.classList.toggle('off', !on);
  netTxt.textContent = on ? 'Online' : 'Offline';
  offbar.classList.toggle('show', !on);
}
addEventListener('online', netState);
addEventListener('offline', netState);
netState();

var deferred = null;
var installBar = document.getElementById('installBar'),
    installBtn = document.getElementById('installBtn'),
    installTxt = document.getElementById('installTxt');

addEventListener('beforeinstallprompt', function (e) {
  e.preventDefault();
  deferred = e;
  installBar.classList.remove('hidden');
});
installBtn.addEventListener('click', function () {
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

/* iOS never fires beforeinstallprompt, so tell people what to do
   instead of leaving them without the option. */
var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
if (isIOS && !standalone) {
  installTxt.innerHTML = '<strong>Install RxLoop</strong> — tap Share, then <strong>Add to Home Screen</strong>. It then opens without Safari and works with no network.';
  installBtn.classList.add('hidden');
  installBar.classList.remove('hidden');
}

if ('serviceWorker' in navigator) {
  addEventListener('load', function () {
    navigator.serviceWorker.register('service-worker.js').catch(function () {
      /* needs https or localhost; silence is correct here */
    });
  });
}

/* ── boot ───────────────────────────────────────────────── */
applyLang();
renderList();
renderLedger();
renderCourses();
scheduleAll();
show(location.hash.replace('#', '') || 'medicines', false);

})();
