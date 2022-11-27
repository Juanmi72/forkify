//import icons from '../img/icons.svg'; // Para la version 1 de Parcel.
import icons from 'url:../../img/icons.svg'; // Para la version 2 de Parcel.

class ResultsView extends View {
  _ParentElement = document.querySelector('.results');

  _generateMarkup() {
    return `
    <li class="preview">
        <a class="preview__link preview__link--active" href="#${this._data.id}">
        <figure class="preview__fig">
            <img src="${this._data.image}" alt="" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${this._data.title} ...</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated">
            <svg>
                <use href="${icons}#icon-user"></use>
            </svg>
            </div>
        </div>
        </a>
    </li>`;
  }
}

export default new ResultsView();
