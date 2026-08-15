/* ══════════════════════════════════════════════════════════
   RxLoop — homepage behaviour
   Depends on /app/data.js (RX.LANGS, RX.UI, RX.MEDS, RX.FLAGS, RX.STATES)
   and optionally three.js for the hero. Everything degrades if
   either is missing.
   ══════════════════════════════════════════════════════════ */
(function () {
"use strict";

var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── shared: nav, reveal, toast ─────────────────────────── */
var nav = document.getElementById('nav');
if (nav) addEventListener('scroll', function () {
  nav.classList.toggle('stuck', scrollY > 40);
}, { passive: true });

var io = new IntersectionObserver(function (es) {
  es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

var toastEl = document.getElementById('toast'), toastT;
function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(function () { toastEl.classList.remove('show'); }, 3400);
}

/* ══════════════════════════════════════════════════════════
   1. HERO — capsule field
   Exactly one instance in ten is blue. The statistic is the
   image and the image is the statistic. A verification sweep
   travels up the field and briefly enlarges what it passes.
   ══════════════════════════════════════════════════════════ */
(function hero() {
  var canvas = document.getElementById('field');
  if (!canvas) return;
  if (!window.THREE) { document.body.classList.add('no3d'); return; }

  var renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); }
  catch (err) { document.body.classList.add('no3d'); return; }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(36, 1, 0.1, 200);
  camera.position.set(0, 0, 17);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8dcea, 1.05));
  var key = new THREE.DirectionalLight(0xffffff, 1.35); key.position.set(5, 8, 10); scene.add(key);
  var rim = new THREE.DirectionalLight(0x0047ff, 0.85); rim.position.set(-8, -3, -6); scene.add(rim);
  var fill = new THREE.DirectionalLight(0xffffff, 0.35); fill.position.set(-4, 2, 6); scene.add(fill);

  /* r128 has no CapsuleGeometry — lathe the profile instead */
  function capsuleGeometry(r, len, seg, rad) {
    var pts = [], half = len / 2, i, a;
    for (i = 0; i <= seg; i++) { a = -Math.PI / 2 + (Math.PI / 2) * (i / seg); pts.push(new THREE.Vector2(Math.cos(a) * r, -half + Math.sin(a) * r)); }
    for (i = 0; i <= seg; i++) { a = (Math.PI / 2) * (i / seg); pts.push(new THREE.Vector2(Math.cos(a) * r, half + Math.sin(a) * r)); }
    return new THREE.LatheGeometry(pts, rad);
  }

  var narrow = window.innerWidth < 700;
  var COUNT = narrow ? 78 : 132;
  var cols = narrow ? 6 : 12;
  var rows = Math.ceil(COUNT / cols);

  var mesh = new THREE.InstancedMesh(
    capsuleGeometry(0.17, 0.46, 7, 14),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.34, metalness: 0.03 }),
    COUNT
  );
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

  var cInk = new THREE.Color(0x11151c), cSoft = new THREE.Color(0x59606d), cFlag = new THREE.Color(0x0047ff);
  var dummy = new THREE.Object3D(), items = [], gapX = 1.34, gapY = 1.28;

  for (var i = 0; i < COUNT; i++) {
    var cx = i % cols, cy = Math.floor(i / cols);
    var flagged = (i % 10) === 4;
    items.push({
      base: new THREE.Vector3(
        (cx - (cols - 1) / 2) * gapX + (Math.random() - .5) * .18,
        ((rows - 1) / 2 - cy) * gapY + (Math.random() - .5) * .18,
        (Math.random() - .5) * 2.4
      ),
      rot: new THREE.Euler(Math.random() * .5 - .25, Math.random() * Math.PI, Math.random() * .85 - .42 + (flagged ? .5 : 0)),
      spin: (Math.random() - .5) * .12,
      phase: Math.random() * Math.PI * 2,
      flagged: flagged
    });
    mesh.setColorAt(i, flagged ? cFlag : (Math.random() > .55 ? cInk : cSoft));
  }
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

  var group = new THREE.Group();
  group.add(mesh);
  var sweep = new THREE.Mesh(
    new THREE.PlaneGeometry(26, 0.5),
    new THREE.MeshBasicMaterial({ color: 0x0047ff, transparent: true, opacity: .13, depthWrite: false })
  );
  sweep.position.z = 1.6;
  group.add(sweep);
  scene.add(group);

  var pointer = { x: 0, y: 0 }, target = { x: 0, y: 0 }, drag = null, manual = 0;

  function resize() {
    var w = canvas.clientWidth || window.innerWidth, h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w < 700 ? 20 : (w < 1100 ? 18.5 : 17);
    camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize);
  resize();

  canvas.addEventListener('pointermove', function (e) {
    var r = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width - .5) * 2;
    pointer.y = ((e.clientY - r.top) / r.height - .5) * 2;
    if (drag !== null) { manual += (e.clientX - drag) * 0.004; drag = e.clientX; }
  });
  canvas.addEventListener('pointerdown', function (e) { drag = e.clientX; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointerup', function () { drag = null; });
  canvas.addEventListener('pointercancel', function () { drag = null; });

  var t = 0, running = true, ticking = false;
  new IntersectionObserver(function (es) {
    running = es[0].isIntersecting;
    if (running && !reduce && !ticking) loop();
  }, { threshold: 0 }).observe(canvas);

  function frame() {
    t += 0.0125;
    target.x += (pointer.y * .16 - target.x) * .045;
    target.y += (pointer.x * .26 + manual - target.y) * .045;
    group.rotation.x = target.x;
    group.rotation.y = target.y + Math.sin(t * .28) * .06;
    sweep.position.y = ((t * 1.5) % 16) - 8;

    for (var i = 0; i < COUNT; i++) {
      var it = items[i];
      dummy.position.copy(it.base);
      dummy.position.y += Math.sin(t * .85 + it.phase) * .075;
      dummy.rotation.set(it.rot.x, it.rot.y + t * it.spin, it.rot.z);
      var s = 1;
      if (it.flagged) {
        var d = Math.abs(dummy.position.y - sweep.position.y);
        s = 1 + Math.max(0, 1 - d / 1.1) * .5 + Math.sin(t * 1.6 + it.phase) * .05;
      }
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    renderer.render(scene, camera);
  }
  function loop() {
    if (!running || reduce) { ticking = false; return; }
    ticking = true;
    frame();
    requestAnimationFrame(loop);
  }
  if (reduce) frame(); else loop();
})();

/* ══════════════════════════════════════════════════════════
   2. MEDICATION REFERENCE DEMO
   ══════════════════════════════════════════════════════════ */
(function reference() {
  var langbar = document.getElementById('langbar'),
      medlist = document.getElementById('medlist'),
      medcard = document.getElementById('medcard');
  if (!langbar || !medlist || !medcard || !window.RX) return;

  var lang = 'en', med = RX.MEDS[0];

  RX.LANGS.forEach(function (L) {
    var b = document.createElement('button');
    b.className = 'chip';
    b.type = 'button';
    b.textContent = L.label;
    b.setAttribute('aria-pressed', String(L.id === lang));
    b.addEventListener('click', function () {
      lang = L.id;
      langbar.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      render();
    });
    langbar.appendChild(b);
  });

  /* The homepage demos a slice; /app/ carries the full reference set. */
  RX.MEDS.slice(0, 7).forEach(function (M) {
    var b = document.createElement('button');
    b.className = 'medbtn';
    b.type = 'button';
    b.setAttribute('aria-pressed', String(M.id === med.id));
    var nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = M.name;
    var sub = document.createElement('span'); sub.className = 'sub'; sub.textContent = M.gen;
    b.appendChild(nm); b.appendChild(sub);
    b.addEventListener('click', function () {
      med = M;
      medlist.querySelectorAll('.medbtn').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      render();
    });
    medlist.appendChild(b);
  });

  function field(k, v) {
    var d = document.createElement('div'); d.className = 'fld';
    var kk = document.createElement('div'); kk.className = 'k mono'; kk.textContent = k;
    var vv = document.createElement('div'); vv.className = 'v'; vv.textContent = v;
    d.appendChild(kk); d.appendChild(vv);
    return d;
  }

  function render() {
    var t = med[lang] || med.en, u = RX.UI[lang] || RX.UI.en;
    medcard.innerHTML = '';
    var h = document.createElement('h3'); h.textContent = med.name;
    var g = document.createElement('div'); g.className = 'gen'; g.textContent = med.gen;
    medcard.appendChild(h);
    medcard.appendChild(g);
    medcard.appendChild(field(u.f1, t.f1));
    medcard.appendChild(field(u.f2, t.f2));
    medcard.appendChild(field(u.f3, t.f3));

    var foot = document.createElement('div'); foot.className = 'medfoot';
    var off = document.createElement('span'); off.className = 'offline-tag mono';
    off.textContent = '\u25C6 ' + u.offline;
    var note = document.createElement('span'); note.className = 'pill-note';
    var dot = document.createElement('span'); dot.className = 'd';
    note.appendChild(dot);
    note.appendChild(document.createTextNode(lang === 'en' ? u.nodose : u.draft));
    foot.appendChild(off);
    foot.appendChild(note);
    medcard.appendChild(foot);

    medcard.classList.remove('swap');
    void medcard.offsetWidth;
    medcard.classList.add('swap');
  }
  render();
})();

/* ══════════════════════════════════════════════════════════
   3. COUNTERFEIT REPORT — device ledger
   In-memory here; /app/ persists the same shape to localStorage.
   ══════════════════════════════════════════════════════════ */
(function report() {
  var form = document.getElementById('reportForm'),
      body = document.getElementById('ledgerBody'),
      count = document.getElementById('ledgerCount'),
      checks = document.getElementById('flagChecks'),
      stateSel = document.getElementById('r-state');
  if (!form || !window.RX) return;

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

  var reports = [];

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var flags = [].slice.call(form.querySelectorAll('input[type=checkbox]:checked')).map(function (c) { return c.value; });
    reports.unshift({
      ref: 'RX-' + Math.random().toString(36).slice(2, 7).toUpperCase(),
      med: form.med.value.trim() || 'Unnamed medicine',
      batch: form.batch.value.trim(),
      where: form.where.value.trim(),
      state: form.state.value,
      flags: flags,
      at: new Date().toISOString()
    });
    render();
    form.reset();
    form.querySelectorAll('input[type=checkbox]').forEach(function (c) { c.checked = false; });
    toast('Report ' + reports[0].ref + ' saved on this device');
  });

  function render() {
    count.textContent = reports.length + (reports.length === 1 ? ' report' : ' reports');
    body.innerHTML = '';
    if (!reports.length) {
      var empty = document.createElement('div');
      empty.className = 'ledger-empty';
      empty.textContent = 'No reports yet. Log one above and it appears here with a reference code you can quote to a pharmacist or NAFDAC.';
      body.appendChild(empty);
      return;
    }
    reports.forEach(function (r) {
      var row = document.createElement('div'); row.className = 'rec';
      var ref = document.createElement('span'); ref.className = 'ref mono'; ref.textContent = r.ref;
      var meta = document.createElement('div'); meta.className = 'meta';
      var b = document.createElement('b'); b.textContent = r.med;
      var small = document.createElement('small');
      var bits = [];
      if (r.batch) bits.push('Batch ' + r.batch);
      if (r.where) bits.push(r.where);
      bits.push(r.state);
      if (r.flags.length) bits.push(r.flags.length + ' flag' + (r.flags.length > 1 ? 's' : '') + ': ' + r.flags[0].toLowerCase());
      small.textContent = bits.join(' \u00B7 ');
      meta.appendChild(b); meta.appendChild(small);
      var st = document.createElement('span'); st.className = 'st'; st.textContent = 'Unverified';
      row.appendChild(ref); row.appendChild(meta); row.appendChild(st);
      body.appendChild(row);
    });
  }
  render();
})();

/* ══════════════════════════════════════════════════════════
   4. ADHERENCE REMINDERS
   ══════════════════════════════════════════════════════════ */
(function reminders() {
  var timeSet = document.getElementById('timeSet'),
      timeline = document.getElementById('timeline'),
      summary = document.getElementById('doseSummary'),
      btn = document.getElementById('notifyBtn');
  if (!timeSet || !timeline) return;

  var SLOTS = ['06:00', '08:00', '12:00', '14:00', '18:00', '20:00', '22:00'];
  var chosen = ['08:00', '14:00', '20:00'];

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
      render();
    });
    timeSet.appendChild(b);
  });

  function render() {
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
      ? chosen.length + ' doses/day \u00B7 next ' + (next || sorted[0] + ' tomorrow')
      : 'No doses set';
  }
  render();

  if (btn) btn.addEventListener('click', function () {
    var name = (document.getElementById('rm-med').value || '').trim() || 'your medicine';
    var line = 'Time for ' + name + '. Take it with water.';
    if (!('Notification' in window)) { toast(line + ' (no notification support here — the app falls back to an in-app alert)'); return; }
    if (Notification.permission === 'granted') {
      try { new Notification('RxLoop', { body: line }); toast('Reminder sent'); }
      catch (e) { toast(line); }
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (p) {
        if (p === 'granted') { try { new Notification('RxLoop', { body: line }); } catch (e) {} toast('Reminders enabled'); }
        else toast(line);
      });
    } else {
      toast('Notifications are blocked in this browser — the app falls back to an in-app alert');
    }
  });
})();

/* ══════════════════════════════════════════════════════════
   5. THE LOOP DIAGRAM
   ══════════════════════════════════════════════════════════ */
(function loopDiagram() {
  var read = document.getElementById('loopRead');
  if (!read) return;

  var LOOP = {
    mfr:  { t: 'Manufacturer', d: 'Knows exactly what it produced and where each batch shipped — then loses sight of it entirely. Gets back: the first geographic signal that packs bearing its name are being imitated.' },
    dist: { t: 'Distributor',  d: 'Moves volume across states with paperwork that rarely survives the last mile. Gets back: batch-level flags on the specific consignments moving through its own network.' },
    pharm:{ t: 'Pharmacy',     d: "The last professional to touch the pack, usually with no way to check a supplier's claim. Gets back: counter alerts on batches its own customers have flagged, plus a dispensing record." },
    pt:   { t: 'Patient',      d: 'The only actor who touches every pack and carries all of the risk. Gets: guidance in their own language, offline, free. Sends: the observation that a pack looks, tastes or works wrong.' },
    reg:  { t: 'Regulator',    d: 'Currently learns about a falsified batch when someone has already been harmed. Gets back: anonymised clusters of suspect reports by state and batch, weeks ahead of formal channels.' }
  };

  function set(k) {
    var n = LOOP[k];
    if (!n) return;
    document.querySelectorAll('.node').forEach(function (el) { el.classList.toggle('on', el.dataset.k === k); });
    read.innerHTML = '';
    var h = document.createElement('h4'); h.textContent = n.t;
    var p = document.createElement('p'); p.textContent = n.d;
    read.appendChild(h); read.appendChild(p);
  }

  document.querySelectorAll('.node').forEach(function (el) {
    ['click', 'mouseenter', 'focus'].forEach(function (ev) {
      el.addEventListener(ev, function () { set(el.dataset.k); });
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set(el.dataset.k); }
    });
  });
  set('pt');
})();

/* ══════════════════════════════════════════════════════════
   6. LIVE vs ROADMAP LEDGER
   ══════════════════════════════════════════════════════════ */
(function statusLedger() {
  var host = document.getElementById('items');
  if (!host) return;

  var ITEMS = [
    { s: 'live', t: 'Medication reference in five languages', d: 'English, Yorùbá, Hausa, Igbo and Nigerian Pidgin. General safety and adherence guidance, deliberately excluding numeric dosing.' },
    { s: 'live', t: 'Full offline operation', d: 'A real service worker caches the app shell and the reference data. Once opened, it keeps working with no connection at all.' },
    { s: 'live', t: 'Installable as a home-screen app', d: "A standard PWA install on Android. On iOS it installs through Safari's Add to Home Screen, which is expected browser behaviour rather than a fault." },
    { s: 'live', t: 'Counterfeit reporting', d: 'Batch code, location and observed red flags, captured in seconds and stored on the device that made the report.' },
    { s: 'live', t: 'Adherence reminders', d: 'Local dose reminders while the app is installed. No server, no account, no data cost.' },
    { s: 'soon', t: 'Computer-vision pack verification', d: 'The original Trust Score concept: checking a pack against manufacturer-verified data. This requires real manufacturer and regulatory partnerships and will not be simulated or implied as live until it genuinely exists.' },
    { s: 'soon', t: 'Shared reporting map', d: 'Cross-device sync so reports aggregate into a live cluster map. Needs a moderated backend with rate limiting to resist spam and bad-faith submissions.' },
    { s: 'soon', t: 'Background push reminders', d: 'True push notifications that fire whether or not the app is open. Needs a push server.' },
    { s: 'soon', t: 'Clinical and language review', d: 'Every reference entry checked by a licensed pharmacist, and each translation reviewed by native-speaking health communicators, before any wide public release.' },
    { s: 'soon', t: 'Pharmacy counter tools', d: 'Batch alerts and dispensing records for the outlet, which is also the first paid tier.' }
  ];

  ITEMS.forEach(function (it) {
    var d = document.createElement('div');
    d.className = 'item ' + it.s;
    var tag = document.createElement('div');
    tag.className = 'tag';
    tag.textContent = it.s === 'live' ? '\u25CF Live today' : '\u25CB Roadmap';
    var body = document.createElement('div');
    var h = document.createElement('h4'); h.textContent = it.t;
    var p = document.createElement('p'); p.textContent = it.d;
    body.appendChild(h); body.appendChild(p);
    d.appendChild(tag); d.appendChild(body);
    host.appendChild(d);
  });

  document.querySelectorAll('.tog button').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.f;
      document.querySelectorAll('.tog button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      document.querySelectorAll('.item').forEach(function (it) {
        it.classList.toggle('hide', f !== 'all' && !it.classList.contains(f));
      });
    });
  });
})();

})();
