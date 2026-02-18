// ============================================
// WIDGET DE CHAT WHATSAPP
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const whatsappButton = document.getElementById('whatsappButton');
  const whatsappChat = document.getElementById('whatsappChat');
  const whatsappClose = document.getElementById('whatsappClose');
  const whatsappSend = document.getElementById('whatsappSend');
  const whatsappMessage = document.getElementById('whatsappMessage');

  // Abrir/cerrar chat
  if (whatsappButton) {
    whatsappButton.addEventListener('click', () => {
      whatsappChat.classList.toggle('active');
      if (whatsappChat.classList.contains('active')) {
        whatsappMessage.focus();
      }
    });
  }

  if (whatsappClose) {
    whatsappClose.addEventListener('click', () => {
      whatsappChat.classList.remove('active');
    });
  }

  // Enviar mensaje
  const sendWhatsAppMessage = () => {
    const message = whatsappMessage.value.trim();
    if (message) {
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/573208806654?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      whatsappMessage.value = '';
      whatsappChat.classList.remove('active');
    }
  };

  if (whatsappSend) {
    whatsappSend.addEventListener('click', sendWhatsAppMessage);
  }

  if (whatsappMessage) {
    whatsappMessage.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendWhatsAppMessage();
      }
    });
  }

  // Cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    const widget = document.getElementById('whatsappWidget');
    if (widget && !widget.contains(e.target) && whatsappChat.classList.contains('active')) {
      whatsappChat.classList.remove('active');
    }
  });
});
