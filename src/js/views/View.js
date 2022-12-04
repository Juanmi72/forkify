// Refactorizamos y vamos a crear una vista principal que nos valdrá para las dos vistas que hemos hecho, la de la recita y la de los resultados.

//import icons from '../img/icons.svg'; // Para la version 1 de Parcel.
import icons from 'url:../../img/icons.svg'; // Para la version 2 de Parcel.

export default class View {
  //_parentElement = document.querySelector('.results');
  _data;

  render(data) {
    // Comprobamos si no hay datos O si los datos son una matriz de resultados y ésta está vacía,  Si se cumple alguna de las dos mostramos el error.
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    console.log(data);
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
