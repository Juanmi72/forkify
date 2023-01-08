// Este fichero contendrá una serie de funciones que vamos a estar utilizando todo el tiempo en otros módulos.
import { TIMEOUT_SEC } from './config.js';

// esto es una funcion que devuelve una promesa que tiene un setTimeout.
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/////// Refactorizemos las funciones getJSON y sendJSON en una sola función
export const AJAX = async function (url, uploadData = undefined) {
  try {
    // Utilizamos un condicional para la variable que cambia de valor según la llamada que sea, get o send.
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // Utilizamos el timeout y ejecutamos el Promise.race para que la primera función asíncrona que se ejecute paralize a la otra.

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    // Para poder controlar el error que se produce aquí en la petición en el fichero model.js que es desde donde se llama a esta función, cuando se produzca el error aquí lo atrapamos con el catch y generamos un nuevo error en el catch con thorow. Con esto forzamos a que la promesa que devuelve la función asíncrona getJSON será rechazada y la podremos tratar en el catch del fichero que la llamó.
    throw err;
  }
};

/* // Esta función se encargará de realizar la petición al fetch y devolver la data.
export const getJSON = async function (url) {
  try {
    // Utilizamos el timeout y ejecutamos el Promise.race para que la primera función asíncrona que se ejecute paralize a la otra.
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    // Para poder controlar el error que se produce aquí en la petición en el fichero model.js que es desde donde se llama a esta función, cuando se produzca el error aquí lo atrapamos con el catch y generamos un nuevo error en el catch con thorow. Con esto forzamos a que la promesa que devuelve la función asíncrona getJSON será rechazada y la podremos tratar en el catch del fichero que la llamó.
    throw err;
  }
};

// Esta función se encargará de enviar los datos a nuestra API de recetas.
export const sendJSON = async function (url, uploadData) {
  try {
    // Utilizamos el timeout y ejecutamos el Promise.race para que la primera función asíncrona que se ejecute paralize a la otra.
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw Error(`${data.message} ${res.status}`);
    return data;
  } catch (err) {
    // Para poder controlar el error que se produce aquí en la petición en el fichero model.js que es desde donde se llama a esta función, cuando se produzca el error aquí lo atrapamos con el catch y generamos un nuevo error en el catch con thorow. Con esto forzamos a que la promesa que devuelve la función asíncrona getJSON será rechazada y la podremos tratar en el catch del fichero que la llamó.
    throw err;
  }
}; */
