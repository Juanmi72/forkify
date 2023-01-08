// En la arquitectura MVC Model-View-Controler este archivo contendrá todos los modelos de la aplicación.(la receta, la búsqueda, los marcadores, etc...)

// Importamos varias cosas

import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
//import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';

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

// Usamos una función que creará nuestro objeto de los datos, bien para cuando los cargamos en loadRecipe o cuando los grabamos en uploadRecipe.

const createRecipeObject = function (data) {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    // Necesitamos agregar la key pero solo si existe una y para ello usamos un truco en el que interviene el shortCut &&, que no es más que si existe la primera parte devuelve la segunda, pero la segunda la ponemos como un objeto y utilizamos la destructuración para que devuelva lo que hay dentro del objeto y así sea como una nueva propiedad con su valor.
    ...(recipe.key && { key: recipe.key }),
  };
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
    //const data = await getJSON(`${API_URL}/${id}`);
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

    // // reformateamos los datos recibidos
    // const { recipe } = data.data;

    // state.recipe = {
    //   id: recipe.id,
    //   title: recipe.title,
    //   publisher: recipe.publisher,
    //   sourceUrl: recipe.source_url,
    //   image: recipe.image_url,
    //   servings: recipe.servings,
    //   cookingTime: recipe.cooking_time,
    //   ingredients: recipe.ingredients,
    // };
    state.recipe = createRecipeObject(data);

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
    // Cargará todas las recetas que continen o no la key nuestra.
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

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
        ...(el.key && { key: el.key }),
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

// Uso de LocalStorage

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add Bookmarks
  state.bookmarks.push(recipe);
  // Mark currente recipe as bookmark. Agregamos una nueva propiedad llamada bookmarked que establecemos a true en el momento que marcamos la receta.
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  // Grabamos bookmarks en LocalStorage.
  persistBookmarks();
};

// Creamos la función que se encargará de borrar una receta al pulsar en una que está marcada con bookmark

export const deleteBookmark = function (id) {
  // Encontramos el id en el array bookmarks y si está borramos el elemento del array bookmarks.
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark currente recipe as NOT bookmarked.
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  // Grabamos bookmarks en LocalStorage.
  persistBookmarks();
};

// Usamos una función de inicialización para cargar los elementos del LocalStorage.

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

// Usemos una función para borrar los marcadores, solo durante desarrollo

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
//clearBookmarks();

// Usamos esta función para subir los datos de la nueva receta a la API de recetas.
export const uploadRecipe = async function (newRecipe) {
  // Usamos try y catch para recoger el posible error de la función asíncrona y generar un nuevo error que se capturará en nuestro controller.
  try {
    // Cambiaremos el formato de los datos recibidos al formato que requiere la API de recetas
    console.log(Object.entries(newRecipe));
    // Obtendremos un array con las entradas de nueva receta y de ese array filtraremos las propiedades que tienen como primer elemento la palabra ingredients y además su segundo valor es diferente de una cadena vacía. Una vez obtenida este array lo mapearemos para que nos separe de cada elemento tres valores que serán cantidad,unidad y descripción.
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        //const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    // Construimos nuestro objeto que se subirá a la API de recetas.
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
