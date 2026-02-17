/**
 * BANESTE CODES - NAVIGATION
 * Sistema de navegación y menú
 */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarMenu = document.getElementById('navbarMenu');
  const navbarLinks = document.querySelectorAll('.navbar-link');
  
  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Agregar clase 'scrolled' cuando se hace scroll
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  if (navbarToggle) {
    navbarToggle.addEventListener('click', () => {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
      
      // Prevenir scroll cuando el menú está abierto
      if (navbarMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navbarMenu.classList.contains('active')) {
      navbarMenu.classList.remove('active');
      navbarToggle.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Cerrar menú al hacer clic en un link
  navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarMenu.classList.contains('active')) {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });
  
  // ============================================
  // ACTIVE LINK HIGHLIGHT
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  
  function highlightActiveLink() {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navbarLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightActiveLink);
  
  // ============================================
  // CERRAR MENÚ AL CAMBIAR TAMAÑO DE VENTANA
  // ============================================
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navbarMenu.classList.contains('active')) {
      navbarMenu.classList.remove('active');
      navbarToggle.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
  
  // ============================================
  // NAVBAR TRANSPARENCY ON HERO
  // ============================================
  const hero = document.querySelector('.hero-section');
  
  if (hero) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navbar.classList.add('transparent');
          } else {
            navbar.classList.remove('transparent');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(hero);
  }
});
