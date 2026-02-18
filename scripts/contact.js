// ============================================
// FORMULARIO DE CONTACTO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Obtener datos del formulario
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
      };

      // Deshabilitar botón de envío
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando...';

      try {
        // Aquí puedes integrar con tu backend o servicio de email
        // Por ahora, simularemos el envío y redirigiremos a WhatsApp
        
        // Simular delay de envío
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Crear mensaje para WhatsApp
        const whatsappMessage = `Hola! Me gustaría contactarlos.%0A%0A` +
          `*Nombre:* ${formData.name}%0A` +
          `*Email:* ${formData.email}%0A` +
          `*Teléfono:* ${formData.phone || 'No proporcionado'}%0A` +
          `*Asunto:* ${formData.subject}%0A%0A` +
          `*Mensaje:*%0A${formData.message}`;

        // Mostrar mensaje de éxito
        formMessage.textContent = '¡Mensaje enviado! Redirigiendo a WhatsApp...';
        formMessage.className = 'form-message success';

        // Resetear formulario
        contactForm.reset();

        // Redirigir a WhatsApp después de 1.5 segundos
        setTimeout(() => {
          window.open(`https://wa.me/573208806654?text=${whatsappMessage}`, '_blank');
          formMessage.style.display = 'none';
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }, 1500);

      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        formMessage.textContent = 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.';
        formMessage.className = 'form-message error';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });

    // Validación en tiempo real
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
          emailInput.style.borderColor = '#ef4444';
        } else {
          emailInput.style.borderColor = '';
        }
      });
    }
  }
});
