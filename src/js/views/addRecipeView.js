import icons from 'url:../../img/icons.svg'; // Para la version 2 de Parcel.
import View from './View.js';

class AddRecipeView extends View {
  // La vista del formulario para cargar una nueva receta ya está en el html, con lo cual solo tenemos que poner o quitar la clase 'hidden' del div que contiene el formulario.
  //El formulario está en un elemento Form de html con la clase 'upload'
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was succssfully uploaded:)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');

  // Tendremos un elemento button para abrir el formulario en la barra de navegación con la clase 'nav_btn--add-recipe' y otro en el formulario para cerrar dicho formulario con la clase 'btn--close-modal'
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  // Utilizamos el constructor para llamar a este método de escucha de eventos, para poder utilizar el objeto this correctamente y que apunte a elemento correcto del html.
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  // Escuchamos los eventos
  // Este es cuando abrimos el formulario.
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  // Este es si cerramos el formulario en el btn de la X o si pulsamos con el raton fuera del formulario.
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  // Este es para guardar los datos introducidos en el formulario.
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // Nos ayudaremos de una API del navegador llamada 'ForData', le tenemos que pasar un formulario, que en nuestro caso es 'this' ya que estamos en una función de manejador de eventos. Este objeto que recibimos lo vamos a meter en un array para poder trabajar con él con la destructuración. Estos datos se usan para subirlos a la API de recetas y donde ocurren las llamadas a esta API?, en el fichero model.js así que debemos buscar la manera de llevar estos datos a ese fichero y lo haremos creando en controller.js una función que controle ese procedimiento.
      const dataArr = [...new FormData(this)];
      // ahora convertiremos este array que contiene 12 arrays, pues el formulario tiene doce campos, con dos valores cada array, titulo y valor en un Objet através de la propiedad fromEntries, para poder tratarlo como un objeto.

      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
