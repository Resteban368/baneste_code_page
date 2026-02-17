/**
 * BANESTE CODES - MAIN JAVASCRIPT
 * Funcionalidad principal de la aplicación
 */

document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // LOADER SCREEN
  // ============================================
  const loader = document.getElementById("loader");
  
  // Ocultar loader después de 2 segundos
  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.style.overflow = "auto";
  }, 2000);

  // ============================================
  // FORMULARIO DE CONTACTO
  // ============================================
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value,
      };

      // Crear el mensaje para enviar por email
      const subject = `Nuevo contacto desde la web: ${formData.name}`;
      const body = `
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone || "No proporcionado"}

Mensaje:
${formData.message}
      `.trim();

      // Abrir cliente de email
      const mailtoLink = `mailto:banestecodes@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      // Mostrar mensaje de confirmación
      showNotification(
        "¡Gracias por contactarnos! Tu cliente de email se abrirá para enviar el mensaje.",
        "success",
      );

      // Resetear formulario
      contactForm.reset();
    });
  }

  // ============================================
  // NOTIFICACIONES
  // ============================================
  function showNotification(message, type = "info") {
    // Crear elemento de notificación
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === "success" ? "#1a8b9d" : "#333"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
      max-width: 400px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remover después de 5 segundos
    setTimeout(() => {
      notification.style.animation = "fadeOut 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // ============================================
  // SMOOTH SCROLL PARA NAVEGACIÓN
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Ignorar enlaces que solo son "#"
      if (href === "#") return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        const navbarHeight = document.getElementById("navbar").offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Cerrar menú móvil si está abierto
        const navbarMenu = document.getElementById("navbarMenu");
        const navbarToggle = document.getElementById("navbarToggle");
        if (navbarMenu.classList.contains("active")) {
          navbarMenu.classList.remove("active");
          navbarToggle.classList.remove("active");
        }
      }
    });
  });

  // ============================================
  // LAZY LOADING DE IMÁGENES
  // ============================================
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // ============================================
  // PARALLAX EFFECT
  // ============================================
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  // Observar contadores y animarlos cuando sean visibles
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          const target = parseInt(entry.target.dataset.target);
          animateCounter(entry.target, target);
          entry.target.dataset.animated = "true";
        }
      });
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll("[data-counter]").forEach((counter) => {
    counterObserver.observe(counter);
  });

  // ============================================
  // DETECCIÓN DE DISPOSITIVO MÓVIL
  // ============================================
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

  if (isMobile) {
    document.body.classList.add("is-mobile");
  }

  // ============================================
  // SCROLL TO TOP BUTTON
  // ============================================
  const scrollToTopBtn = document.getElementById("scrollToTop");
  
  if (scrollToTopBtn) {
    // Mostrar/ocultar botón según scroll
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    });
    
    // Funcionalidad del botón
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ============================================
  // PREVENIR ZOOM EN INPUTS (MÓVIL)
  // ============================================
  if (isMobile) {
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        document
          .querySelector("meta[name=viewport]")
          .setAttribute(
            "content",
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
          );
      });

      input.addEventListener("blur", () => {
        document
          .querySelector("meta[name=viewport]")
          .setAttribute("content", "width=device-width, initial-scale=1.0");
      });
    });
  }
});
