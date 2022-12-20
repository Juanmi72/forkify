// En la arquitectura MVC Model-View-Controler este archivo contendrá todos los modelos de la aplicación.(la receta, la búsqueda, los marcadores, etc...)

// Importamos varias cosas

import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

// Tendremos un estado global que será un objeto que contiene lo que hemos dicho arriba.

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  // Esta función cambiará nuestro estado global que contendrá la recipe y lo que hará serar cargar la receta con Fetch, que al ser una promesa vamos a manejar sus errores

  // 1) Loading recipe
  try {
    // Estas lineas las pasamos a una función en helpers.js
    // const res = await fetch(
    //   `${API_URL}/${id}`
    //   //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    // );
    // const data = await res.json();
    // console.log(res, data.data.recipe);

    // // En la API tenemos una propiedad 'ok' que si es false es porque se ha producido un error y nos vale para generar un error nosotros.
    // if (!res.ok) throw Error(`${data.message} ${res.status}`);

    // Refactorización hacia helpers.js
    const data = await getJSON(`${API_URL}/${id}`);

    // reformateamos los datos recibidos
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // Cargamos como markadas las recetas de la API que están en el array de las bookmarked para que aparezcan con el icono de marcado relleno.
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    console.log(state.recipe);
  } catch (err) {
    // Temp error handling
    console.log(`${err} 💥💥💥💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  //const inputSearch = document.querySelector('.search__field');
  try {
    // const res = await fetch(`${API_URL}?search=${inputSearch.value}`);
    // const data = await res.json();
    //console.log(res, data.data);
    //console.log(data.data.recipes);
    //console.log(data.data.recipes[0]);

    // Refactorizacion llamada a lista de recetas
    state.search.query = query;
    console.log(query);
    //const data = await getJSON(`${API_URL}?search=${inputSearch.value}`);
    const data = await getJSON(`${API_URL}?search=${query}`);

    //console.log(data.data.recipes);
    // reformateamos los datos recibidos y mapeamos la lista de encontrados

    state.search.results = data.data.recipes.map(function (el) {
      //let recipes = el;
      //console.log(el);
      return {
        id: el.id,
        title: el.title,
        publisher: el.publisher,
        sourceUrl: `${API_URL}/${el.id}`,
        image: el.image_url,
      };
    });
    // La inicializamos a 1 para que cuando vuelva a buscar una receta los resultados los muestre desde la page 1.
    state.search.page = 1;

    //console.log(state.search.results);
  } catch (err) {
    console.log(`${err} 💥💥💥💥💥`);
    throw err;
  }
};

// Creamos la función que se encargará de devolver los resultados de la página en la que estemos.

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

// Creamos la función que se encargará de establecer una receta con bookmark

export const addBookmark = function (recipe) {
  // Add Bookmarks
  state.bookmarks.push(recipe);
  // Mark currente recipe as bookmark. Agregamos una nueva propiedad llamada bookmarked que establecemos a true en el momento que marcamos la receta.
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

// Creamos la función que se encargará de borrar una receta al pulsar en una que está marcada con bookmark

export const deleteBookmark = function (id) {
  // Encontramos el id en el array bookmarks y si está borramos el elemento del array bookmarks.
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark currente recipe as NOT bookmarked.
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
