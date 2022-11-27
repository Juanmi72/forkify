// En la arquitectura MVC Model-View-Controler este archivo contendrá todos los controladores de la aplicación.

// Importamos desde model tanto el objeto state como la función loadRecipe(). Al hacerlo como model, después las podemos llamar con model.state o model.loadRecipe().
import * as model from './model.js';

// importamos desde recipeview.js la vista de la receta.
import recipeView from './views/recipeview.js';

// Importamos desde searchview.js el input de nuestro DOM
import searchView from './views/searchview.js';

// Importamos la vista de la lista de resultados
import resultsView from './views/resultsview.js';

// Como estamos usando Parcel va a buscar los iconos a la ruta de dist, pero nosotros en nuestro Template de abajo utilizamos las rutas locales, y no los carga si no los importamos.
//import icons from '../img/icons.svg'; // Para la version 1 de Parcel.
import icons from 'url:../img/icons.svg'; // Para la version 2 de Parcel.

// Esta importación es para que nuestro proyecto funcione en navegadores que no soporten ES6 y async/await.
import 'core-js/stable';
import 'regenerator-runtime/runtime';

//const recipeContainer = document.querySelector('.recipe');
//const recipesContainer = document.querySelector('.search-results');
//const inputSearch = document.querySelector('.search__field');
//const btnSearch = document.querySelector('.search__btn');

// Nos la llevamos a helpers.js

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2  // API

///////////////////////////////////////

/* const renderSpinner = function (parentEl) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
}; */

const controlRecipes = async function () {
  try {
    // Vamos a obtener el id de la receta dinámicamente, desde el hash.
    const id = window.location.hash.slice(1);
    //console.log(id);
    // Por si no hay ningun hash:
    if (!id) return;
    // Refactorización
    // El spiner ahora es un método de la clase recipeView.
    recipeView.renderSpinner();

    /*
    // 1) Loading recipe
    renderSpinner(recipeContainer);
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    const data = await res.json();
    console.log(res, data.data.recipe);

    // En la API tenemos una propiedad 'ok' que si es false es porque se ha producido un error y nos vale para generar un error nosotros.
    if (!res.ok) throw Error(`${data.message} ${res.status}`);

    // reformateamos los datos recibidos
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
 */

    // Refactorización por módulos
    // Como loadRecipe es una función asíncrona debemos utilizar await.
    await model.loadRecipe(id);

    // Para Probar
    //const { recipe } = model.state;

    // 2) Rendering recipe
    /* const markup = `
    <figure class="recipe__fig">
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          recipe.cookigTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          recipe.servings
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
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
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
      ${recipe.ingredients
        .map(ing => {
          return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>
        `;
        })
        .join('')}
        

        
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          recipe.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>`;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup); */

    // Refactorización por módulos
    // Utilizamos la clase RecipeView con su metodo render para mostrar esta vista.
    recipeView.render(model.state.recipe);
  } catch (err) {
    //console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // Refactorizamos
    resultsView.renderSpinner();
    // 1) Obtener cadena que vamos a consultar
    const query = searchView.getQuery();

    if (!query) return;

    // 2) Cargar resultados encontrados
    await model.loadSearchResults(query);
    console.log(model.state.search.results);

    // 3) Mostrar resultados

    resultsView.render(model.state.search.results);

    /*
    //renderSpinner(recipesContainer);
    

    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${inputSearch.value}`
    );
    const data = await res.json();
    //console.log(res, data.data);
    //console.log(data.data.recipes);
    //console.log(data.data.recipes[0]);

    // reformateamos los datos recibidos y mapeamos la lista de encontrados

    const listRecipes = data.data.recipes.map(function (el) {
      let recipes = el;
      recipes = {
        id: recipes.id,
        title: recipes.title,
        publisher: recipes.publisher,
        sourceUrl: `https://forkify-api.herokuapp.com/api/v2/recipes/${recipes.id}`,
        image: recipes.image_url,
      };

      console.log(recipes);

    
    const markup = `<li class="preview">
            <a class="preview__link preview__link--active" href="#${recipes.id}">
              <figure class="preview__fig">
                <img src="${recipes.image}" alt="" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipes.title} ...</h4>
                <p class="preview__publisher">${recipes.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
    //recipesContainer.innerHTML = '';
    recipesContainer.insertAdjacentHTML('afterbegin', markup);

    });*/
  } catch (err) {
    console.log(err);
  }
};

// Realizamos la busqueda de recetas una vez pulsado el boton search.
// Lo hemos refactorizado con submit en el init() para qeu se ejecute tanto cuando se pulsa el boton como cuando se valida con intro el input.
/* btnSearch.addEventListener(
  'click',

  function (e) {
    controlSearchResults();
  }
); */

// Vamos a escuchar un evento para que cada vez que seleccionemos una receta de la lista de recetas, como cambiamos el hash, detectaremos ese cambio para cargar la receta en la parte de los ingredientes.

//window.addEventListener('hashchange', controlRecipes);

// Si copiamos la pagina en otra pestaña del navegador, tenemos que controlar este movimiento pues como no ha cambiado el hash no mostraría receta alguna. Lo controlamos con el evento de carga de window.

//window.addEventListener('load', controlRecipes);

// Refactorizacion // Como vemos hay dos eventos que cargan la misma función y se escuchan en el mismo elemento del dom, cuando esto ocurre, con dos o mas podemos crear un arry con los nombres de los eventos y con un forEach podemos ejecutar la función.

// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipes)
// );

// Refactorizamos el manejo de eventos, según un método de diseño llamado Publicador-Editor por el cual nosotro definimos los eventos según el modelo de arquitectura MVC en la vista(recipeview.js), pero vemos como aquí llamamos en los eventos a una función que se encuentra en el controller.js, la solución es definir la llamada en recipeview.js y éste recibe una función, que será la que le enviamos desde el controller.js.

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
