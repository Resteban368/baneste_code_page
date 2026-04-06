/* ============================================
   LIGHTBOX / ZOOM DE IMÁGENES
   ============================================ */

(function () {
  // Crea el overlay del lightbox
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.innerHTML = `
    <div class="lightbox-backdrop"></div>
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Cerrar">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <img class="lightbox-img" src="" alt="">
    </div>
  `;
  document.body.appendChild(overlay);

  const img = overlay.querySelector('.lightbox-img');
  const closeBtn = overlay.querySelector('.lightbox-close');
  const backdrop = overlay.querySelector('.lightbox-backdrop');

  function openLightbox(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Adjunta el lightbox a todas las imágenes dentro de carruseles
  function attachLightbox() {
    document.querySelectorAll('.carousel-slide img, .project-carousel img').forEach(image => {
      if (image.dataset.lightboxAttached) return;
      image.dataset.lightboxAttached = 'true';
      image.style.cursor = 'zoom-in';
      image.addEventListener('click', () => openLightbox(image.src, image.alt));
    });
  }

  document.addEventListener('DOMContentLoaded', attachLightbox);

  // Expone la función por si se agregan imágenes dinámicamente
  window.attachLightbox = attachLightbox;
})();
