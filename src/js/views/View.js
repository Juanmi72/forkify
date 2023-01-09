// Refactorizamos y vamos a crear una vista principal que nos valdrá para las dos vistas que hemos hecho, la de la recita y la de los resultados.

//import icons from '../img/icons.svg'; // Para la version 1 de Parcel.
import icons from 'url:../../img/icons.svg'; // Para la version 2 de Parcel.

export default class View {
  //_parentElement = document.querySelector('.results');
  _data;
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Juanmi
   * @todo Finish implementation
   */
  render(data, render = true) {
    // Comprobamos si no hay datos O si los datos son una matriz de resultados y ésta está vacía,  Si se cumple alguna de las dos mostramos el error.
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    //console.log(data);
    this._data = data;
    const markup = this._generateMarkup();

    // render será un chivato para saber si viene de bookmarksView o de resultsview, ya que so es false vendrá de bookmarksView y devolveremos la cadena que tratará en bookmarks en su método _generateMarkup
    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  // Crearemos un método para actualizar texto y algunas partes del DOM.
  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    // Vamos a generar un nuevo marcado y este lo compararemos con el anterior y esa será la forma de actualizar, solo actualizaremos lo que cambie.
    const newMarkup = this._generateMarkup();
    // convertimos el nuevo marcado en un objeto del DOM para poder compararlo con lo que hay en el DOM actualmente.
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // Lo nuevo del DOM virtual que no está todavía en pantalla. Lo convertimos en un ARRAY.
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // El DOM que se encuentra en pantalla actualmente. Lo convertimos en un ARRAY.
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    //console.log(curElements);
    //console.log(newElements);
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // Comparamos los dos elementos.
      //console.log(curEl, newEl.isEqualNode(curEl));
      // Ademas de comparar los nodos debemos comprobar si el primer hijo en su propiedad nodeValue sin espacios  debe tener texto.
      // Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        //console.log('❤', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }
      // TAmbién deberemos cambiar los atributos y eso solo debe hacerse si cambia el texto, nos da igual el nodeValue.
      // Update changed ATTributes
      if (!newEl.isEqualNode(curEl)) {
        //console.log(Array.from(newEl.attributes));
        // Convertimos en una matriz los atributos que hay para recorrerla con un forEach y hacer lo mismo que hemos hecho con el texto pero con los atributos.

        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // Diseño de nuestro Spinner
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  // Manejo de Errores de rechazo
  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  // Manejo de Errores de éxito
  renderMessage(message = this._message) {
    const markup = `
    <div class="recipe">
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
