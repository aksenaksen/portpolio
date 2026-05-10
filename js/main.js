// ================================
// Main Portfolio JavaScript
// ================================

// Debounce function for performance
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Portfolio loaded successfully!');

  // Initialize all modules
  initNavigation();
  initScrollProgress();
  initTypingAnimation();
  initSmoothScroll();
  initMobileMenu();
});

// ================================
// Navigation
// ================================

function initNavigation() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Remove active state from all links
      navLinks.forEach(l => l.classList.remove('text-emerald-400'));
      // Add active state to clicked link
      link.classList.add('text-emerald-400');
    });
  });

  // Update navigation based on scroll position
  window.addEventListener('scroll', debounce(() => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-emerald-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-emerald-400');
      }
    });
  }, 100));
}

// ================================
// Scroll Progress Bar
// ================================

function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', throttle(() => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / windowHeight) * 100;
    progressBar.style.width = progress + '%';
  }, 50));
}

// ================================
// Typing Animation
// ================================

function initTypingAnimation() {
  const typingText = document.getElementById('typing-text');
  const texts = [
    'Spring Boot와 AWS 기반 아키텍처 경험',
    '안정적이고 확장 가능한 백엔드 개발',
    '문제 해결과 지속적인 학습',
    '팀 협업과 코드 품질'
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingText.textContent = currentText.substring(0, charIndex);

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      speed = 3000; // Pause before deleting
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 500; // Pause before typing new text
    }

    setTimeout(type, speed);
  }

  type();
}

// ================================
// Smooth Scroll
// ================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ================================
// Mobile Menu
// ================================

function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const nav = document.querySelector('nav ul');
      nav.classList.toggle('hidden');
    });

    // Close menu when link is clicked
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        const nav = document.querySelector('nav ul');
        nav.classList.add('hidden');
      });
    });
  }
}

// ================================
// Scroll to Top Button
// ================================

function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scroll-to-top');

  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('hidden');
      } else {
        scrollToTopBtn.classList.add('hidden');
      }
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ================================
// Print Portfolio
// ================================

function printPortfolio() {
  window.print();
}

// ================================
// Utility Functions
// ================================

// Copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copied to clipboard:', text);
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

// Format date
function formatDate(date) {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Get current year
function getCurrentYear() {
  return new Date().getFullYear();
}

// Log visitor info (optional analytics)
function logVisitorInfo() {
  console.log('%c Welcome to 문지웅 Portfolio! ', 'background: #10b981; color: white; font-size: 16px; padding: 8px;');
  console.log('%c If you are interested in working together, reach out: ans109905@naver.com ', 'font-size: 14px; color: #10b981;');
}

logVisitorInfo();

// ================================
// Export functions for global use
// ================================

window.Portfolio = {
  printPortfolio,
  copyToClipboard,
  formatDate,
  getCurrentYear
};
