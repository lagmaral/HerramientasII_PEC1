// Espera a que el contenido HTML esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function() {

  // Obtiene la ruta de la URL actual
  const path = window.location.pathname;

  // Extrae el nombre de la página de la URL, eliminando la extensión
  let currentPage = path.split("/").pop().split(".")[0];

  // Si `currentPage` está vacío (por ejemplo, cuando estamos en la raíz del sitio),
  // asigna el valor "index" para tratarlo como si fuera la página principal
  if (!currentPage) {
    currentPage = "index";
  }
  // Selecciona todos los enlaces de navegación dentro del header
  let navLinks = document.querySelectorAll(".header__nav-link");

  // Recorre cada enlace de navegación del header
  navLinks.forEach(link => {
      // Verifica si el valor de `data-page` del enlace coincide con `currentPage`
      if (link.dataset.page === currentPage) {
          // Oculta el enlace que coincide con la página actual para evitar redundancia
          link.style.display = "none";
      }
  });

  // Selecciona todos los enlaces de navegación dentro del footer
  navLinks = document.querySelectorAll(".footer__nav-link");

  // Recorre cada enlace de navegación del footer
  navLinks.forEach(link => {
      // Verifica si el valor de `data-page` del enlace coincide con `currentPage`
      if (link.dataset.page === currentPage) {
          // Oculta el enlace que coincide con la página actual en el footer
          link.style.display = "none";
      }
  });

  const dropdowns = document.querySelectorAll('.contact-container__form-dropdown-selector');

  dropdowns.forEach(dropdown => {
      const dropdownMenu = dropdown.nextElementSibling; // Encuentra el ul correspondiente
      const hiddenInput = dropdown.parentElement.querySelector('.contact-container__form-dropdown-selected-value'); // Encuentra el input oculto correspondiente

      // Agregar evento a cada ítem del menú
      dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
          item.addEventListener('click', (event) => {
              event.preventDefault(); // Evitar la navegación
              const selectedText = item.textContent; // Texto del ítem seleccionado
              const selectedValue = item.getAttribute('data-value'); // Valor del ítem seleccionado

              // Actualizar el botón con el texto seleccionado
              dropdown.textContent = selectedText;

              // Actualizar el valor oculto
              hiddenInput.value = selectedValue;
          });
      });
  });


});

