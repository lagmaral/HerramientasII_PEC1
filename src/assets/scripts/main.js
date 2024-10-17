/**
 * Importa dependencias de node_modules
 * ver ejemplos comentados abajo
 */

// import 'some-node-module';
// import SomeModule from 'some-node-module';

/**
 * Función principal que inicializa el script
 */
+(function() {
  initListeners(); // Llama a la función para inicializar los listeners
})();

/**
 * Función para inicializar todos los listeners de eventos
 */
function initListeners() {
  // Añade listeners para los botones del menú del header
  manejarBotonesMenuHeader();

  // Añade listener para el botón del menú móvil
  manejarMenuMovil();

  // Añade listeners para los enlaces del menú de la izquierda y activar la sección correcta
  manejarEnlacesMenuIzquierdo();

  // Añade listeners para los enlaces de leer mas
  expandirTexto();

}

/**
 * Maneja los eventos de clic en los botones del header para alternar los menús desplegables
 */
function manejarBotonesMenuHeader() {
  var botones = document.getElementsByClassName('header__bottom__menu__btn');

  // Itera sobre cada botón del header y añade eventos de clic
  for (var i = 0; i < botones.length; i++) {
    // Alterna la clase 'show' en el menú desplegable asociado
    botones[i].addEventListener('click', function() {
      var menuDesplegable = this.nextElementSibling; // Obtiene el siguiente elemento hermano (el menú desplegable)

      // Alterna la visibilidad del menú desplegable
      menuDesplegable.classList.toggle('show');
    });

    // Oculta el menú cuando se hace clic fuera de él
    botones[i].addEventListener('focusout', function(event) {
      var menuDesplegable = this.nextElementSibling;
      if (!menuDesplegable.contains(event.relatedTarget)) {
        menuDesplegable.classList.remove('show');
      }
    });
  }
}

/**
 * Maneja el evento de clic del botón del menú móvil
 */
function manejarMenuMovil() {
  const botonMenuMovil = document.querySelector('.header__bottom__mobile__btn');
  const panelMenuMovil = document.querySelector('.header__bottom__mobile__panel');

  // Alterna la clase 'show' en el panel del menú móvil cuando se hace clic
  botonMenuMovil.addEventListener('click', function() {
    panelMenuMovil.classList.toggle('show');
  });
}

/**
 * Maneja los eventos de clic en los enlaces del menú de la izquierda para activar la sección correcta
 */
function manejarEnlacesMenuIzquierdo() {
  const enlacesMenuIzquierdo = document.querySelectorAll('.container__sections__left__menu__link');

  // Itera sobre cada enlace del menú de la izquierda
  enlacesMenuIzquierdo.forEach(enlace => {
    enlace.addEventListener('click', function(event) {
      event.preventDefault();

      // Elimina la clase 'active' de todos los enlaces
      enlacesMenuIzquierdo.forEach(l => l.classList.remove('active'));

      // Añade la clase 'active' al enlace clicado
      event.target.classList.add('active');

      // Obtiene la sección objetivo desde el atributo data-target
      const seccionObjetivo = document.querySelector(this.getAttribute('data-target'));

      // Modifica la sección mostrada en la parte derecha
      modificarSeccionActiva(seccionObjetivo);
    });
  });
}

/**
 * Función para modificar la sección activa en la parte derecha
 * @param {HTMLElement} objetivo - El elemento de la sección objetivo que se va a activar
 */
function modificarSeccionActiva(objetivo) {
  const contenedor = document.querySelector('.container__sections__right');
  const elementos = contenedor.children;

  // Itera sobre todos los hijos del contenedor de la derecha
  for (let i = 0; i < elementos.length; i++) {
    const elementoActual = elementos[i];

    // Compara la segunda clase (por ejemplo, 'element1', 'element2', etc.) con la de la sección objetivo
    if (elementoActual.classList[1].indexOf(objetivo.classList[1]) > -1) {
      // Si coinciden, activa la sección
      elementoActual.classList.replace(elementoActual.classList[0], "container__sections__right__element.active");
    } else {
      // Si no coinciden, desactiva la sección
      elementoActual.classList.replace(elementoActual.classList[0], "container__sections__right__element");
    }
  }
}

function expandirTexto(){
   // Seleccionamos todos los párrafos y enlaces con las nuevas clases BEM
   const paragraphs = document.querySelectorAll('.container__sections__right__element__paragraph');
   const toggleTextLinks = document.querySelectorAll('.container__sections__right__element__toggle-text');

   const maxLength = 250;  // Número de caracteres que queremos mostrar en la versión truncada

   // Iteramos sobre los párrafos para truncar el texto y añadir el comportamiento
   paragraphs.forEach((paragraph, index) => {
     const fullText = paragraph.textContent.trim();  // Guardamos el texto completo
     const truncatedText = fullText.substring(0, maxLength) + '...'; // Texto truncado

     // Verificamos si el texto completo es más largo que el truncado
     if (fullText.length > maxLength && window.innerWidth <= 768) {
       paragraph.textContent = truncatedText; // Mostramos el texto truncado inicialmente

       // Añadimos el evento al enlace "Leer más"
       toggleTextLinks[index].addEventListener('click', function(e) {
         e.preventDefault();

         // Verificamos si el párrafo está expandido o no
         if (paragraph.classList.contains('container__sections__right__element__paragraph__expanded')) {
           paragraph.classList.remove('container__sections__right__element__paragraph__expanded'); // Contraer el texto
           paragraph.textContent = truncatedText;  // Volvemos a mostrar el texto truncado
           this.textContent = 'Leer más';          // Cambiamos el texto del enlace
         } else {
           paragraph.classList.add('container__sections__right__element__paragraph__expanded');    // Expandir el texto
           paragraph.textContent = fullText;       // Mostramos el texto completo
           this.textContent = 'Leer menos';        // Cambiamos el texto del enlace
         }
       });
     } else {
       // Si el texto ya es corto, ocultamos el enlace "Leer más"
       toggleTextLinks[index].style.display = 'none';
     }
   });
}

