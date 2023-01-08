//import icons from '../img/icons.svg'; // Para la version 1 de Parcel.
import icons from 'url:../../img/icons.svg'; // Para la version 2 de Parcel.
import View from './View.js';

// Esta sera una clase para la vista previa de la lista de recetas tanto en la lista como en los bookmarks
class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    // Para que cuando seleccionamos una receta no se renderize todo el DOM vamos a utilizar también update pero debemos dejar marcada la clase "preview__link"
    const id = window.location.hash.slice(1);
    return `
    <li class="preview">
        <a class="preview__link ${
          this._data.id === id ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
          <figure class="preview__fig">
              <img src="${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
              <h4 class="preview__title">${this._data.title} ...</h4>
              <p class="preview__publisher">${this._data.publisher}</p>
              <div class="preview__user-generated ${
                this._data.key ? '' : 'hidden'
              }">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
          </div>
        </a>
    </li>`;
  }
}

export default new PreviewView();
