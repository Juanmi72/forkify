// Como estamos usando Parcel va a buscar los iconos a la ruta de dist, pero nosotros en nuestro Template de abajo utilizamos las rutas locales, y no los carga si no los importamos.
//import icons from '../img/icons.svg'; // Para la version 1 de Parcel.
//import icons from 'url:../../img/icons.svg'; // Para la version 2 de Parcel.

class SearchView {
  _parentElement = document.querySelector('.search');

  // es el valor del input de nuestra consulta de recetas.
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  render(data) {
    console.log(this._data);
    this._data = data;
    this._data.forEach(function () {
      const markup = this._generateMarkup();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    });
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
