// En la arquitectura MVC Model-View-Controler este archivo contendrá todos los modelos de la aplicación.(la receta, la búsqueda, los marcadores, etc...)

// Tendremos un estado global que será un objeto que contiene lo que hemos dicho arriba.

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  // Esta función cambiará nuestro estado global que contendrá la recipe y lo que hará serar cargar la receta con Fetch, que al ser una promesa vamos a manejar sus errores

  // 1) Loading recipe
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      //'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    const data = await res.json();
    console.log(res, data.data.recipe);

    // En la API tenemos una propiedad 'ok' que si es false es porque se ha producido un error y nos vale para generar un error nosotros.
    if (!res.ok) throw Error(`${data.message} ${res.status}`);

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
    alert(err.message);
  }
};
