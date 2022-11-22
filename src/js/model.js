// En la arquitectura MVC Model-View-Controler este archivo contendrá todos los modelos de la aplicación.(la receta, la búsqueda, los marcadores, etc...)

// Importamos varias cosas

import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

// Tendremos un estado global que será un objeto que contiene lo que hemos dicho arriba.

export const state = {
  recipe: {},
  recipes: {},
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
  } catch (err) {
    // Temp error handling
    console.log(`${err} 💥`);
  }
};

export const loadRecipes = async function () {
  const inputSearch = document.querySelector('.search__field');
  try {
    const res = await fetch(`${API_URL}?search=${inputSearch.value}`);
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
        sourceUrl: `${API_URL}/${recipes.id}`,
        image: recipes.image_url,
      };
    });

    console.log(recipes);
  } catch (err) {
    alert(err.message);
  }
};
