import icons from 'url:../../img/icons.svg'; // Para la version 2 de Parcel.
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  // Manejo de eventos con una función para que esté separado de la vista.
  addHandlerClick(handler) {
    // Usaremos la delegación de eventos pues tenemos dos botones y cada uno hace una cosa.
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      //console.log(btn);
      if (!btn) return;
      // variable que contine el número de página al que debemos ir, lo sacamos del data-set que hemos incluido en el botón.

      const goToPage = +btn.dataset.goto;
      //console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    // Pagina Actual
    const curPage = this._data.page;
    // Para saber el número de páginas devueltas hacemos lo siguiente. La función Math.ceil() devuelve el entero mayor o igual más próximo a un número dado.
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //console.log(numPages);
    // Veamos las diferentes siguaciones en las que mostramos botones

    // Estamos en Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      // Para saber a que página debemos ir vamos a utilizar en html los data-set "data-goto" con un atributo que será la página a la que queremos ir.
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>`;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>`;
    }

    // Other page
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;
    }
    // Page 1, and there are NO other pages

    return '';
  }
}

export default new PaginationView();
