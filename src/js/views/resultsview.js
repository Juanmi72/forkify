//import icons from '../img/icons.svg'; // Para la version 1 de Parcel.
import icons from 'url:../../img/icons.svg'; // Para la version 2 de Parcel.
import View from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _generateMarkup() {
    console.log(this._data);

    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {
    // Para que cuando seleccionamos una receta no se renderize todo el DOM vamos a utilizar también update pero debemos dejar marcada la clase "preview__link"
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
        <a class="preview__link ${
          result.id === id ? 'preview__link--active' : ''
        }" href="#${result.id}">
        <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${result.title} ...</h4>
            <p class="preview__publisher">${result.publisher}</p>
        </div>
        </a>
    </li>`;
  }
}

export default new ResultsView();
