const dotenv = require("dotenv");
dotenv.config();

export async function fetchMovieData(movieName) {
  const formattedName = encodeURIComponent(movieName);
  const url = `https://api.themoviedb.org/3/search/movie?query=${formattedName}&include_adult=false&language=es-US&page=1`;
  const apiKey = "Bearer " + process.env.TMDB_API_KEY;
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

export async function fetchMovieDataById(movieId) {
  const urlDetails = `https://api.themoviedb.org/3/movie/${movieId}?language=es-US`;
  const urlCast = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=es-US`;
  const apiKey = "Bearer " + process.env.TMDB_API_KEY;
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
    console.log(movieData);
    return movieData;
  } catch (error) {
    console.error(error);
  }
}

// Función principal para procesar la lista de películas y guardar los resultados en un archivo JSON
fetchMovieDataById(238);
