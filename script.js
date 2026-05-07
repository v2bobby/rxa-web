// ============================================
// RxAssist Premium Landing — Interactive Behaviors
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Tailwind Script Config (custom theme colors)
  const style = document.createElement('style');
  style.innerHTML = `
    :root {
      --accent-teal: #14B8A6;
      --accent-cyan: #22D3EE;
    }
  `;
  document.head.appendChild(style);

  // ==================== NAV SCROLL BEHAVIOR ====================
  const nav = document.getElementById('nav');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.classList.add('!bg-[#0A0C14]', 'shadow-xl');
      nav.classList.remove('bg-[#0A0C14]/95');
    } else {
      nav.classList.remove('!bg-[#0A0C14]', 'shadow-xl');
      nav.classList.add('bg-[#0A0C14]/95');
    }
  });

  // ==================== MOBILE MENU ====================
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        mobileBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        `;
      } else {
        mobileMenu.classList.remove('hidden');
        mobileBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6h12v12" />
          </svg>
        `;
      }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        `;
      });
    });
  }

  // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==================== SCROLL REVEAL ANIMATIONS ====================
  const reveals = document.querySelectorAll('.glass-card, .feature-card, section > div');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = '80ms';
        entry.target.classList.add('reveal', 'visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(el => {
    // Only apply to cards and major sections for performance
    if (el.classList.contains('glass-card') || el.classList.contains('feature-card')) {
      observer.observe(el);
    }
  });

  // ==================== WAITLIST FORM HANDLING ====================
  const form = document.getElementById('waitlist-form');
  const successState = document.getElementById('success-state');
  const btnText = document.getElementById('btn-text');
  const btnSpinner = document.getElementById('btn-spinner');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('email');
      const nameInput = document.getElementById('name');
      const roleSelect = document.getElementById('role');

      // Basic validation
      if (!emailInput.value || !roleSelect.value) {
        emailInput.classList.add('!border-red-500');
        setTimeout(() => emailInput.classList.remove('!border-red-500'), 1800);
        return;
      }

      // Show loading state
      btnText.classList.add('hidden');
      btnSpinner.classList.remove('hidden');
      form.querySelector('button').disabled = true;

      // Simulate API call (production would POST to backend / waitlist service)
      await new Promise(resolve => setTimeout(resolve, 1250));

      // Hide form, show success
      form.style.transition = 'all 0.3s ease';
      form.style.opacity = '0';
      
      setTimeout(() => {
        form.classList.add('hidden');
        successState.classList.remove('hidden');
        successState.style.opacity = '0';
        
        // Trigger confetti-like micro animation (subtle)
        createMicroConfetti();
        
        setTimeout(() => {
          successState.style.transition = 'opacity 0.4s ease';
          successState.style.opacity = '1';
        }, 50);
      }, 280);
    });
  }

  // Micro confetti for premium feel on success
  function createMicroConfetti() {
    const colors = ['#22D3EE', '#34D399', '#6366F1'];
    const container = document.getElementById('success-state');
    
    for (let i = 0; i < 18; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '5px';
      particle.style.height = '5px';
      particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = '-10px';
      particle.style.opacity = Math.random() * 0.7 + 0.4;
      particle.style.zIndex = '10';
      particle.style.pointerEvents = 'none';
      
      container.appendChild(particle);

      const duration = Math.random() * 1100 + 950;
      const xDrift = (Math.random() - 0.5) * 80;

      particle.animate([
        { 
          transform: `translateY(0) translateX(0)`, 
          opacity: particle.style.opacity 
        },
        { 
          transform: `translateY(${120 + Math.random() * 40}px) translateX(${xDrift}px)`, 
          opacity: 0 
        }
      ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
      }).onfinish = () => particle.remove();
    }
  }

  // Reset form function (called from success state)
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

      // Re-enable button
      const submitBtn = formEl.querySelector('button');
      submitBtn.disabled = false;
      document.getElementById('btn-text').classList.remove('hidden');
      document.getElementById('btn-spinner').classList.add('hidden');
    }, 220);
  };

  // ==================== ACTIVE NAV HIGHLIGHT (Scrollspy) ====================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = ['challenge', 'solution', 'impact', 'roadmap'];

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY + 180;

    sections.forEach(sectionId => {
      const sectionEl = document.getElementById(sectionId);
      if (sectionEl && scrollY >= sectionEl.offsetTop) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active', 'text-white');
      link.classList.add('text-[#94A3B8]');
      
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active', 'text-white');
        link.classList.remove('text-[#94A3B8]');
      }
    });
  });

  // ==================== KEYBOARD ACCESSIBILITY ====================
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName === 'BODY') {
      e.preventDefault();
      const emailField = document.getElementById('email');
      if (emailField) emailField.focus();
    }
  });

  // Easter egg: Press "?" to highlight waitlist
  document.addEventListener('keypress', (e) => {
    if (e.key === '?') {
      const waitlist = document.getElementById('waitlist');
      if (waitlist) {
        waitlist.scrollIntoView({ behavior: 'smooth', block: 'center' });
        waitlist.style.transition = 'box-shadow 0.4s ease';
        waitlist.style.boxShadow = '0 0 0 4px rgba(34, 211, 238, 0.2)';
        setTimeout(() => {
          waitlist.style.boxShadow = 'none';
        }, 1600);
      }
    }
  });

  // Final polish: Preload subtle hover states
  console.log('%c[RxAssist] Premium landing initialized — high-end tech pharmaceutical experience ready.', 'color:#64748B; font-size:9px');
});