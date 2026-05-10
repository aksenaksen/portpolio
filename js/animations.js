// ================================
// Scroll Animation Module
// ================================

// Intersection Observer for scroll animations
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add animation class with stagger effect
        setTimeout(() => {
          entry.target.classList.add('animate-fadeInUp');
        }, index * 100);

        // Optional: unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all scroll-fadeIn elements
  document.querySelectorAll('.scroll-fadeIn').forEach(el => {
    observer.observe(el);
  });

  return observer;
}

// Parallax effect for hero section
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length === 0) return;

  window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
      const scrollPosition = window.pageYOffset;
      const speed = element.getAttribute('data-parallax') || 0.5;
      element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  });
}

// Counter animation for statistics
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length === 0) return;

  const counterObserverOptions = {
    threshold: 0.5
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
        const target = entry.target;
        const finalCount = parseInt(target.getAttribute('data-count'));

        animateCounter(target, finalCount);
        target.setAttribute('data-counted', 'true');
        counterObserver.unobserve(target);
      }
    });
  }, counterObserverOptions);

  counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

// Stagger animation for list items
function initStaggerAnimation() {
  const staggerLists = document.querySelectorAll('[data-stagger]');

  staggerLists.forEach(list => {
    const items = list.querySelectorAll('li, > div');
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          items.forEach((item, index) => {
            item.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
            item.style.opacity = '0';
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(list);
  });
}

// Hover lift effect for cards
function initCardHoverEffect() {
  const cards = document.querySelectorAll('.card-hover, [data-card-hover]');

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
      card.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.15)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
    });
  });
}

// Reveal text animation
function initRevealTextAnimation() {
  const revealTexts = document.querySelectorAll('[data-reveal]');

  revealTexts.forEach(element => {
    const text = element.textContent;
    element.innerHTML = '';

    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? ' ' : char;
      span.style.animation = `fadeInUp 0.6s ease-out ${index * 0.05}s forwards`;
      span.style.opacity = '0';
      element.appendChild(span);
    });
  });
}

// Background gradient animation
function initGradientAnimation() {
  const gradientElements = document.querySelectorAll('[data-gradient]');

  gradientElements.forEach(element => {
    const angle = Math.random() * 360;
    element.style.backgroundImage = `linear-gradient(${angle}deg, rgba(16, 185, 129, 0.1), rgba(99, 102, 241, 0.1))`;

    // Animate gradient
    let currentAngle = angle;
    setInterval(() => {
      currentAngle += 0.5;
      element.style.backgroundImage = `linear-gradient(${currentAngle}deg, rgba(16, 185, 129, 0.1), rgba(99, 102, 241, 0.1))`;
    }, 100);
  });
}

// Scroll-triggered class toggle
function initScrollTriggerClass() {
  const triggers = document.querySelectorAll('[data-scroll-trigger]');

  triggers.forEach(trigger => {
    const className = trigger.getAttribute('data-scroll-trigger');
    const options = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        } else {
          entry.target.classList.remove(className);
        }
      });
    }, options);

    observer.observe(trigger);
  });
}

// Animated progress bar
function initProgressBar() {
  const progressBars = document.querySelectorAll('[data-progress]');

  const progressObserverOptions = {
    threshold: 0.5
  };

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
        const bar = entry.target;
        const progress = parseInt(bar.getAttribute('data-progress'));

        bar.style.width = '0';
        setTimeout(() => {
          bar.style.transition = 'width 1s ease-out';
          bar.style.width = progress + '%';
        }, 100);

        bar.setAttribute('data-animated', 'true');
        progressObserver.unobserve(bar);
      }
    });
  }, progressObserverOptions);

  progressBars.forEach(bar => progressObserver.observe(bar));
}

// Tab animation
function initTabAnimation() {
  const tabButtons = document.querySelectorAll('[data-tab-button]');
  const tabContents = document.querySelectorAll('[data-tab-content]');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab-button');

      // Deactivate all tabs
      tabButtons.forEach(btn => btn.classList.remove('text-emerald-400'));
      tabContents.forEach(content => {
        content.classList.remove('opacity-100');
        content.classList.add('opacity-0', 'pointer-events-none');
      });

      // Activate selected tab
      button.classList.add('text-emerald-400');
      const selectedContent = document.querySelector(`[data-tab-content="${tabName}"]`);
      if (selectedContent) {
        selectedContent.classList.remove('opacity-0', 'pointer-events-none');
        selectedContent.classList.add('opacity-100');
      }
    });
  });
}

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initIntersectionObserver();
  initParallax();
  initCounterAnimation();
  initStaggerAnimation();
  initCardHoverEffect();
  initRevealTextAnimation();
  initGradientAnimation();
  initScrollTriggerClass();
  initProgressBar();
  initTabAnimation();

  console.log('✨ All animations initialized!');
});

// Pause animations on scroll (performance optimization)
let scrollTimeout;
let isScrolling = false;

window.addEventListener('scroll', () => {
  if (!isScrolling) {
    isScrolling = true;
    document.body.classList.add('is-scrolling');
  }

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
    document.body.classList.remove('is-scrolling');
  }, 150);
});

// Export for global use
window.AnimationModule = {
  initIntersectionObserver,
  initParallax,
  initCounterAnimation,
  initStaggerAnimation,
  initCardHoverEffect,
  initRevealTextAnimation,
  initGradientAnimation,
  initScrollTriggerClass,
  initProgressBar,
  initTabAnimation
};
