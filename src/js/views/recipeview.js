// En la arquitectura MVC Model-View-Controler este archivo contendrá la vista de la receta y tendremos otros ficheros para las otras vistas.

// Como estamos usando Parcel va a buscar los iconos a la ruta de dist, pero nosotros en nuestro Template de abajo utilizamos las rutas locales, y no los carga si no los importamos.
//import icons from '../img/icons.svg'; // Para la version 1 de Parcel.
import icons from 'url:../../img/icons.svg'; // Para la version 2 de Parcel.

// Usamos una librería llamada fractional que la hemos instalado con:
// npm install fractional
// y la usaremos para convertir los 0.5 en 1/2.
import { Fraction } from 'fractional';
//console.log(Fraction);

// Refactorizamos las vistas en todo lo que se va a repetir en las dos vistas.
import View from './View.js';

// Vamos a usas CLASES para las vistas, crearemos una clase que contendrá el elemento padre de esa vista en el dom y los datos, luego tendrá un método llamado render que tendrá los datos y un método privado que devolverá el contenido en el DOM.
// Utilizaremos una extension de la clase View y pondremos las vistas iguales en el Fichero View.

class RecipeView extends View {
  //Vamos a cambiar el símbolo de privado de Babel y Parcel por el de Javascript.
  //_data;
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';
  /*
  _data;
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';

  render(data) {
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
  renderError(message = this._message) {
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
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
*/
  // Manejo de Eventos
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  // Mostrar nuestra receta
  _generateMarkup() {
    //console.log(this.#data);
    return `
        <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>
    
        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookigTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>
    
            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
    
          <div class="recipe__user-generated">
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>
    
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>      
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngredient).join('')}
            
    
            
          </ul>
        </div>
    
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }

  // Reformatear nuestras cantidades de ingredientes
  _generateMarkupIngredient(ing) {
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
    `;
  }
}

// Exportamos una nueva instancia de la clase RecipeView.
export default new RecipeView();
