const dotenv = require("dotenv");
dotenv.config();
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const fs = require("fs");
const axios = require("axios");

async function fetchMovieData(movieName) {
  const formattedName = encodeURIComponent(movieName);
  const url = `https://api.themoviedb.org/3/search/movie?query=${formattedName}&include_adult=false&language=es-US&page=1`;
  const apiKey = "Bearer " + TMDB_API_KEY;
  console.log(apiKey);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: apiKey,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.results.length > 0) {
      const {
        genres,
        id,
        original_language,
        original_title,
        overview,
        poster_path,
        title,
        release_date,
      } = data.results[0];
      console.log({
        genres,
        id,
        original_language,
        original_title,
        overview,
        poster_path,
        title,
        release_date,
      });
      return {
        genres,
        id,
        original_language,
        original_title,
        overview,
        poster_path,
        title,
        release_date,
      };
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchMovieDataById(movieId) {
  console.log("Fetching movie data for ID:", movieId);
  const urlDetails = `https://api.themoviedb.org/3/movie/${movieId}?language=es-US`;
  const urlCast = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=es-US`;
  const apiKey = "Bearer " + TMDB_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: apiKey,
    },
  };

  try {
    const response = await fetch(urlDetails, options);
    const data = await response.json();
    const {
      genres,
      id,
      original_language,
      original_title,
      overview,
      poster_path,
      title,
      release_date,
    } = data;
    const responseCast = await fetch(urlCast, options);
    const dataCast = await responseCast.json();
    const movieData = {
      genres,
      id,
      original_language,
      original_title,
      overview,
      poster_path,
      title,
      release_date,
      cast: dataCast.cast.slice(0, 10),
      director: dataCast.crew.find((person) => person.job === "Director"),
    };
    return movieData;
  } catch (error) {
    console.error(error);
  }
}

async function updateMovieDataById(movieId, oldMovieId) {
  try {
    // Paso 2: Buscar la película en la base de datos

    const response = await axios.get(
      "http://localhost:9000/api/movie/" + oldMovieId
    );

    listId = parseInt(response.data[0].list_id);
    console.log("Película encontrada:", listId, response.data[0].title);

    const newMovie = await fetchMovieDataById(movieId);

    if (!newMovie) {
      // Paso 3: Verificar si la película existe
      console.error("Película no encontrada");
      return;
    }

    // Paso 5: Actualizar la película
    const updatedMovieData = { ...newMovie, seen: false, list_id: listId };
    //console.log("Nueva película:", updatedMovieData);

    // Paso 6: Guardar los cambios en la base de datos
    const responsePut = await axios.put(
      "http://localhost:9000/api/movie/list_id/" + listId,
      updatedMovieData
    );

    console.log(responsePut.data);

    // Paso 7: Retornar el resultado
    console.log("Película actualizada con éxito");
  } catch (error) {
    console.error("Error al actualizar la película:", error);
  }
}
async function updateMovieDataByListId(movieId, listId) {
  try {
    // Paso 2: Buscar la película en la base de datos

    const response = await axios.get(
      "http://localhost:9000/api/movie/list_id/" + listId
    );

    console.log("Película a reemplazar:", listId, response.data[0].title);

    const newMovie = await fetchMovieDataById(movieId);

    console.log("Nueva película:", newMovie.title, newMovie.id);

    if (!newMovie) {
      // Paso 3: Verificar si la película existe
      console.error("Película no encontrada");
      return;
    }

    // Paso 5: Actualizar la película
    const updatedMovieData = { ...newMovie, seen: false, list_id: listId };
    //console.log("Nueva película:", updatedMovieData);

    // Paso 6: Guardar los cambios en la base de datos
    const responsePut = await axios.put(
      "http://localhost:9000/api/movie/list_id/" + listId,
      updatedMovieData
    );

    console.log(responsePut.data);

    // Paso 7: Retornar el resultado
    console.log("Película actualizada con éxito");
  } catch (error) {
    console.error("Error al actualizar la película:", error);
  }
}

async function updateMovieListId(currentListId, newListId) {
  try {
    // Paso 1: Buscar la película por su list_id actual
    const responseGet = await axios.get(
      `http://localhost:9000/api/movie/list_id/${currentListId}`
    );
    const movieData = responseGet.data;
    console.log("Película encontrada:", movieData.title);
    if (!movieData) {
      console.error("Película no encontrada");
      return;
    }

    // Paso 2: Preparar los datos de la película con el nuevo list_id
    const updatedMovieData = { ...movieData, list_id: newListId };

    // Paso 3: Guardar los cambios en la base de datos
    const responsePut = await axios.put(
      `http://localhost:9000/api/movie/list_id/${currentListId}`,
      updatedMovieData
    );

    console.log("Película actualizada con éxito:", responsePut.data);
  } catch (error) {
    console.error("Error al actualizar la película:", error);
  }
}

async function addMovieById(movieId, listId) {
  try {
    const newMovie = await fetchMovieDataById(movieId);

    if (!newMovie) {
      console.error("Película no encontrada");
      return;
    }
    const updatedMovieData = { ...newMovie, seen: false, list_id: listId };

    console.log("Nueva película:", updatedMovieData);
    const response = await axios.post(
      "http://localhost:9000/api/movie",
      updatedMovieData
    );

    console.log("Película añadida con éxito:", response.data);
  } catch (error) {
    console.error("Error al añadir la película:", error);
  }
}

function procesarArreglo(arreglo) {
  // Crear un nuevo arreglo para los elementos únicos
  const elementosUnicos = [];
  // Crear un conjunto para llevar registro de los IDs únicos (basado en el criterio elegido, ej. id del director)
  const nombresUnicos = new Set();
  // Inicializar el contador de list_id
  let listIdActual = 248;

  arreglo.forEach((elemento) => {
    // Verificar si el id del director ya existe en el conjunto
    if (!nombresUnicos.has(elemento.title)) {
      // Si no existe, agregarlo al conjunto y al nuevo arreglo
      nombresUnicos.add(elemento.title);
      // Actualizar el list_id del elemento actual
      elemento.list_id = listIdActual++;
      // Agregar el elemento al arreglo de elementos únicos
      delete elemento._id;
      delete elemento.__v;
      elementosUnicos.push(elemento);
    }
  });

  // Retornar el nuevo arreglo con elementos únicos y list_id actualizados
  return elementosUnicos;
}

/* // Read the contents of "248.json" file
const datos = JSON.parse(fs.readFileSync("248.json", "utf-8"));

const datosProcesados = procesarArreglo(datos);
console.log(datosProcesados);

// Guardar los datos procesados en un archivo JSON
fs.writeFileSync("datosProcesados.json", JSON.stringify(datosProcesados)); */

addMovieById(5165, 290);
//updateMovieDataByListId(10784, 353);
/* (async function () {
  for (let i = 388; i >= 358; i--) {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Espera 1 segundo
    updateMovieListId(i, i + 3);
  }
})(); */
