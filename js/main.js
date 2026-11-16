(function () {
  'use strict';

  var WA_NUMBER = '526563563127';

  // Año del footer
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Menú móvil
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    var setOpen = function (open) {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
  }

  // Animación de entrada al hacer scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Formulario -> mensaje de WhatsApp
  var form = document.getElementById('wa-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = form.nombre.value.trim();
      if (!nombre) {
        form.nombre.focus();
        return;
      }
      var texto =
        'Hola Mia Fashion, soy ' + nombre + '.\n' +
        'Me interesa: ' + form.interes.value + '.\n' +
        (form.mensaje.value.trim() ? form.mensaje.value.trim() : '');
      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(texto.trim());
      window.open(url, '_blank', 'noopener');
    });
  }
})();
