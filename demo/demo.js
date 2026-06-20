// ============================================
// PharmAssist Demo Page — Scan Simulation + Waitlist
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ==================== SAMPLE DATA ====================
  const samples = {
    amox: {
      name: 'Amoxicillin 500mg',
      guidanceLocal: '"Mu oogun yi pelu ounje. Pari gbogbo ọjọ meje lati dena atako oogun."',
      guidanceEn: 'Take with food. Complete the full 7-day course to prevent resistance.'
    },
    paracetamol: {
      name: 'Paracetamol 500mg',
      guidanceLocal: '"Maṣe mu ju egbo merin lo ni wakati merinlelogun. Mu pelu omi."',
      guidanceEn: 'Do not exceed 4 doses in 24 hours. Take with water.'
    }
  };

  const stepSelect = document.getElementById('step-select');
  const stepScanning = document.getElementById('step-scanning');
  const stepResult = document.getElementById('step-result');
  const statusTag = document.getElementById('demo-status-tag');
  const scanProgressText = document.getElementById('scan-progress-text');

  const progressMessages = [
    'Checking hologram pattern…',
    'Cross-referencing batch code…',
    'Querying manufacturer database…',
    'Calculating Trust Score…'
  ];

  document.querySelectorAll('.sample-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sampleKey = btn.getAttribute('data-sample');
      runScan(sampleKey);
    });
  });

  function runScan(sampleKey) {
    const sample = samples[sampleKey];
    if (!sample) return;

    stepSelect.classList.add('hidden');
    stepResult.classList.add('hidden');
    stepScanning.classList.remove('hidden');
    statusTag.textContent = 'Scanning…';
    statusTag.classList.add('!bg-[#FBF1DF]', '!border-[#B6791A]', '!text-[#B6791A]');

    let msgIndex = 0;
    scanProgressText.textContent = progressMessages[0];
    const interval = setInterval(() => {
      msgIndex++;
      if (msgIndex < progressMessages.length) {
        scanProgressText.textContent = progressMessages[msgIndex];
      }
    }, 550);

    setTimeout(() => {
      clearInterval(interval);
      stepScanning.classList.add('hidden');
      stepResult.classList.remove('hidden');
      statusTag.textContent = 'Verified';
      statusTag.classList.remove('!bg-[#FBF1DF]', '!border-[#B6791A]', '!text-[#B6791A]');

      document.getElementById('result-name').textContent = sample.name;
      document.getElementById('result-guidance-local').textContent = sample.guidanceLocal;
      document.getElementById('result-guidance-en').textContent = sample.guidanceEn;
    }, 2300);
  }

  const scanAgainBtn = document.getElementById('scan-again-btn');
  if (scanAgainBtn) {
    scanAgainBtn.addEventListener('click', () => {
      stepResult.classList.add('hidden');
      stepSelect.classList.remove('hidden');
      statusTag.textContent = 'Ready';
    });
  }

  // ==================== WAITLIST FORM ====================
  const form = document.getElementById('waitlist-form');
  const successState = document.getElementById('success-state');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('email');
      const roleSelect = document.getElementById('role');

      if (!emailInput.value || !roleSelect.value) {
        emailInput.classList.add('!border-red-500');
        setTimeout(() => emailInput.classList.remove('!border-red-500'), 1800);
        return;
      }

      btnText.classList.add('hidden');
      btnSpinner.classList.remove('hidden');
      form.querySelector('button').disabled = true;

      await new Promise(resolve => setTimeout(resolve, 1100));

      form.style.transition = 'all 0.3s ease';
      form.style.opacity = '0';

      setTimeout(() => {
        form.classList.add('hidden');
        successState.classList.remove('hidden');
        successState.style.opacity = '0';

        setTimeout(() => {
          successState.style.transition = 'opacity 0.4s ease';
          successState.style.opacity = '1';
        }, 50);
      }, 280);
    });
  }

  window.resetForm = function () {
    const formEl = document.getElementById('waitlist-form');
    const successEl = document.getElementById('success-state');

    successEl.style.transition = 'opacity 0.25s ease';
    successEl.style.opacity = '0';

    setTimeout(() => {
      successEl.classList.add('hidden');
      successEl.style.opacity = '1';

      formEl.classList.remove('hidden');
      formEl.style.opacity = '1';
      formEl.reset();

      const submitBtn = formEl.querySelector('button');
      submitBtn.disabled = false;
      document.getElementById('btn-text').classList.remove('hidden');
      document.getElementById('btn-spinner').classList.add('hidden');
    }, 220);
  };
});
