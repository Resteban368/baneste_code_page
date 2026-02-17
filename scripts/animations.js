/**
 * BANESTE CODES - ANIMATIONS
 * Sistema de animaciones y scroll reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
  
  // ============================================
  // STAGGER ANIMATIONS
  // ============================================
  const staggerContainers = document.querySelectorAll('[data-stagger]');
  
  staggerContainers.forEach(container => {
    const items = container.children;
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            Array.from(items).forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('stagger-item');
              }, index * 100);
            });
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    staggerObserver.observe(container);
  });
  
  // ============================================
  // PARALLAX SCROLL
  // ============================================
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.parallax) || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
  
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateParallax);
    });
  }
  
  // ============================================
  // HOVER TILT EFFECT (CARDS)
  // ============================================
  const tiltCards = document.querySelectorAll('[data-tilt]');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
  
  // ============================================
  // SMOOTH ENTRANCE FOR PAGE LOAD
  // ============================================
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
  
  // ============================================
  // PERFORMANCE: REDUCE MOTION
  // ============================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    // Deshabilitar animaciones complejas
    document.querySelectorAll('[data-parallax]').forEach(el => {
      el.removeAttribute('data-parallax');
    });
    
    document.querySelectorAll('[data-tilt]').forEach(el => {
      el.removeAttribute('data-tilt');
    });
  }
});
