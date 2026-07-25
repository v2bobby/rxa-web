// ============================================
// RxLoop App — Core Logic
// Real, functional MVP: medication reference, counterfeit
// reporting (device-local), and adherence reminders.
// ============================================

(function () {
  'use strict';

  const STORAGE_KEYS = {
    lang: 'rxloop_lang',
    reports: 'rxloop_reports',
    reminders: 'rxloop_reminders'
  };

  let currentLang = localStorage.getItem(STORAGE_KEYS.lang) || 'en';
  let selectedMedId = null;

  // ==================== INIT ====================
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('lang-select').value = currentLang;
    renderMedList();
    renderGeneralNotice();
    renderReports();
    renderReminders();
    bindTabs();
    bindLanguageSwitch();
    bindSearch();
    bindReportForm();
    bindReminderForm();
    bindInstallPrompt();
    bindOfflineDetection();
    registerServiceWorker();
    scheduleAllReminders();
  });

  // ==================== TABS ====================
  function bindTabs() {
    const tabs = document.querySelectorAll('.app-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => {
          t.setAttribute('aria-selected', 'false');
          t.classList.remove('app-tab--active');
        });
        tab.setAttribute('aria-selected', 'true');
        tab.classList.add('app-tab--active');

        document.querySelectorAll('.app-panel').forEach(p => p.classList.add('hidden'));
        document.getElementById('tab-' + tab.dataset.tab).classList.remove('hidden');
      });
    });
    // Activate first tab visually on load
    tabs[0].classList.add('app-tab--active');
  }

  // ==================== LANGUAGE ====================
  function bindLanguageSwitch() {
    document.getElementById('lang-select').addEventListener('change', (e) => {
      currentLang = e.target.value;
      localStorage.setItem(STORAGE_KEYS.lang, currentLang);
      renderMedList();
      renderGeneralNotice();
      if (selectedMedId) renderMedDetail(selectedMedId);
    });
  }

  function renderGeneralNotice() {
    document.getElementById('general-notice').textContent = RXLOOP_GENERAL_NOTICES[currentLang] || RXLOOP_GENERAL_NOTICES.en;
  }

  // ==================== MEDICATION LOOKUP ====================
  function renderMedList(filter) {
    const list = document.getElementById('med-list');
    const detail = document.getElementById('med-detail');
    detail.classList.add('hidden');
    list.classList.remove('hidden');

    const q = (filter || '').trim().toLowerCase();
    const items = RXLOOP_MEDICATIONS.filter(m =>
      !q || m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)
    );

    if (items.length === 0) {
      list.innerHTML = '<p class="text-sm text-[#5A6B65] py-8 text-center">No medications match your search.</p>';
      return;
    }

    list.innerHTML = items.map(m => `
      <button class="med-item specimen rounded-xl p-5 w-full text-left flex items-center justify-between" data-id="${m.id}">
        <div>
          <div class="font-display font-semibold text-lg">${escapeHtml(m.name)}</div>
          <div class="specimen-label mt-1">${escapeHtml(m.category)}</div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#5A6B65] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    `).join('');

    document.querySelectorAll('.med-item').forEach(btn => {
      btn.addEventListener('click', () => renderMedDetail(btn.dataset.id));
    });
  }

  function renderMedDetail(id) {
    selectedMedId = id;
    const med = RXLOOP_MEDICATIONS.find(m => m.id === id);
    if (!med) return;

    const content = med[currentLang] || med.en;
    const list = document.getElementById('med-list');
    const detail = document.getElementById('med-detail');
    list.classList.add('hidden');
    detail.classList.remove('hidden');

    detail.innerHTML = `
      <button id="back-to-list" class="text-sm font-semibold text-[#0D7A6E] hover:underline mb-5 flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Back to list
      </button>

      <div class="specimen rounded-2xl overflow-hidden">
        <div class="bg-[#0F1A17] px-6 py-4">
          <div class="specimen-label text-[#9FB5AF]">${escapeHtml(med.category)}</div>
          <div class="font-display text-xl font-semibold text-white mt-0.5">${escapeHtml(med.name)}</div>
        </div>
        <div class="p-6 space-y-5">
          <div>
            <div class="specimen-label mb-1.5">What it's for</div>
            <p class="text-sm text-[#3D4D48] leading-relaxed">${escapeHtml(content.purpose)}</p>
          </div>
          <div class="hairline"></div>
          <div>
            <div class="specimen-label mb-2">Precautions</div>
            <ul class="space-y-2">
              ${content.precautions.map(p => `
                <li class="flex gap-2 text-sm text-[#3D4D48] leading-relaxed">
                  <span class="text-[#0D7A6E] flex-shrink-0">•</span><span>${escapeHtml(p)}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="hairline"></div>
          <div>
            <div class="specimen-label mb-1.5">Adherence</div>
            <p class="text-sm text-[#3D4D48] leading-relaxed">${escapeHtml(content.adherence)}</p>
          </div>
          <div class="hairline"></div>
          <div class="bg-[#FBF1DF] border border-[#E8C77A] rounded-xl p-4">
            <div class="text-xs font-semibold text-[#8A5A0A] tracking-wide uppercase mb-1">Seek help if</div>
            <p class="text-sm text-[#6B4A0A] leading-relaxed">${escapeHtml(content.seekHelp)}</p>
          </div>
        </div>
      </div>
    `;

    document.getElementById('back-to-list').addEventListener('click', () => {
      selectedMedId = null;
      renderMedList(document.getElementById('med-search').value);
    });
  }

  function bindSearch() {
    document.getElementById('med-search').addEventListener('input', (e) => {
      renderMedList(e.target.value);
    });
  }

  // ==================== COUNTERFEIT REPORTING ====================
  function getReports() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.reports)) || [];
    } catch {
      return [];
    }
  }

  function saveReports(reports) {
    localStorage.setItem(STORAGE_KEYS.reports, JSON.stringify(reports));
  }

  function bindReportForm() {
    const form = document.getElementById('report-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const photoInput = document.getElementById('report-photo');
      let photoDataUrl = null;
      if (photoInput.files && photoInput.files[0]) {
        photoDataUrl = await fileToDataUrl(photoInput.files[0]);
      }

      const report = {
        id: 'r_' + Date.now(),
        medName: document.getElementById('report-med-name').value,
        batch: document.getElementById('report-batch').value,
        location: document.getElementById('report-location').value,
        notes: document.getElementById('report-notes').value,
        photo: photoDataUrl,
        createdAt: new Date().toISOString(),
        synced: false
      };

      const reports = getReports();
      reports.unshift(report);
      saveReports(reports);

      form.reset();
      renderReports();
    });
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function renderReports() {
    const reports = getReports();
    const list = document.getElementById('reports-list');
    const empty = document.getElementById('reports-empty');

    if (reports.length === 0) {
      list.innerHTML = '';
      empty.classList.remove('hidden');
      return;
    }
    empty.classList.add('hidden');

    list.innerHTML = reports.map(r => `
      <div class="specimen rounded-xl p-5">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="font-display font-semibold">${escapeHtml(r.medName)}</div>
            <div class="text-xs text-[#5A6B65] mt-1">${new Date(r.createdAt).toLocaleDateString()} · ${r.location ? escapeHtml(r.location) : 'Location not given'}</div>
          </div>
          <button class="delete-report text-xs text-[#5A6B65] hover:text-red-600" data-id="${r.id}" aria-label="Delete report">✕</button>
        </div>
        ${r.batch ? `<div class="text-xs text-[#5A6B65] mt-2 font-mono">Batch: ${escapeHtml(r.batch)}</div>` : ''}
        ${r.notes ? `<p class="text-sm text-[#3D4D48] mt-2">${escapeHtml(r.notes)}</p>` : ''}
        ${r.photo ? `<img src="${r.photo}" alt="Reported packaging" class="mt-3 rounded-lg max-h-40 object-cover">` : ''}
        <div class="trust-tag inline-flex px-2 py-0.5 rounded mt-3 !bg-[#F2F6F4] !border-[#DDE5E2] !text-[#5A6B65]">Saved on this device</div>
      </div>
    `).join('');

    document.querySelectorAll('.delete-report').forEach(btn => {
      btn.addEventListener('click', () => {
        const reports = getReports().filter(r => r.id !== btn.dataset.id);
        saveReports(reports);
        renderReports();
      });
    });
  }

  // ==================== REMINDERS ====================
  function getReminders() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.reminders)) || [];
    } catch {
      return [];
    }
  }

  function saveReminders(reminders) {
    localStorage.setItem(STORAGE_KEYS.reminders, JSON.stringify(reminders));
  }

  function bindReminderForm() {
    const form = document.getElementById('reminder-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
      }

      const reminder = {
        id: 'rem_' + Date.now(),
        medName: document.getElementById('reminder-med').value,
        time: document.getElementById('reminder-time').value
      };

      const reminders = getReminders();
      reminders.push(reminder);
      saveReminders(reminders);

      form.reset();
      renderReminders();
      scheduleReminder(reminder);
    });
  }

  function renderReminders() {
    const reminders = getReminders();
    const list = document.getElementById('reminders-list');
    const empty = document.getElementById('reminders-empty');

    if (reminders.length === 0) {
      list.innerHTML = '';
      empty.classList.remove('hidden');
      return;
    }
    empty.classList.add('hidden');

    list.innerHTML = reminders.map(r => `
      <div class="specimen rounded-xl p-4 flex items-center justify-between">
        <div>
          <div class="font-display font-semibold">${escapeHtml(r.medName)}</div>
          <div class="readout text-sm text-[#0D7A6E] mt-0.5">${escapeHtml(r.time)}</div>
        </div>
        <button class="delete-reminder text-xs text-[#5A6B65] hover:text-red-600" data-id="${r.id}" aria-label="Delete reminder">✕</button>
      </div>
    `).join('');

    document.querySelectorAll('.delete-reminder').forEach(btn => {
      btn.addEventListener('click', () => {
        const reminders = getReminders().filter(r => r.id !== btn.dataset.id);
        saveReminders(reminders);
        renderReminders();
      });
    });
  }

  // Schedules a reminder while the app/tab remains open. Browser notification
  // scheduling has no true background-alarm API without a push server, so this
  // covers the "app open or installed and running" case honestly — see README
  // for the production upgrade path (push server + service worker sync).
  function scheduleReminder(reminder) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    const [h, m] = reminder.time.split(':').map(Number);
    const now = new Date();
    const target = new Date();
    target.setHours(h, m, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);

    const msUntil = target - now;
    setTimeout(() => {
      new Notification('RxLoop reminder', { body: reminder.medName, icon: 'icons/icon-192.png' });
      scheduleReminder(reminder); // reschedule for the next day
    }, msUntil);
  }

  function scheduleAllReminders() {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    getReminders().forEach(scheduleReminder);
  }

  // ==================== INSTALL PROMPT ====================
  function bindInstallPrompt() {
    let deferredPrompt = null;
    const installBtn = document.getElementById('install-btn');

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installBtn.classList.remove('hidden');
    });

    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      installBtn.classList.add('hidden');
    });

    window.addEventListener('appinstalled', () => {
      installBtn.classList.add('hidden');
    });
  }

  // ==================== OFFLINE DETECTION ====================
  function bindOfflineDetection() {
    const banner = document.getElementById('offline-banner');
    function update() {
      banner.classList.toggle('hidden', navigator.onLine);
    }
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
  }

  // ==================== SERVICE WORKER ====================
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js').catch(err => {
        console.warn('RxLoop: service worker registration failed', err);
      });
    }
  }

  // ==================== UTIL ====================
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }
})();
