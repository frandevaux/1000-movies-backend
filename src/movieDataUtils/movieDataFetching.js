const dotenv = require("dotenv");
dotenv.config();

async function fetchMovieDataById(movieId) {
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
    return movieData;
  } catch (error) {
    console.error(error);
  }
}

const fs = require("fs").promises;
async function processMovies(filePath) {
  const movies = readMovieListFile(filePath);
  const results = [];

  for (const [index, movieName] of movies.entries()) {
    const movieData = await fetchMovieData(movieName).then((data) => {
      console.log(data);
    });
    if (movieData) {
      movieData.list_id = index + 1;
      movieData.seen = false;
      results.push(movieData);
    }
  }

  fs.writeFileSync("movies.json", JSON.stringify(results, null, 2), "utf8");
  console.log("Archivo movies.json generado con éxito.");
}

async function processMoviesById(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const movies = JSON.parse(fileContent);

    const results = [];

    for (const movie of movies) {
      const movieData = await fetchMovieDataById(movie.id);
      if (movieData) {
        movieData.seen = movie.seen;
        movieData.list_id = movie.list_id;
        results.push(movieData);
      }
      console.log(movieData);
    }

    await fs.writeFile(
      "moviesDetails.json",
      JSON.stringify(results, null, 2),
      "utf8"
    );
    console.log("Archivo moviesDetails.json generado con éxito.");
  } catch (error) {
    console.error("Error al procesar las películas:", error);
  }
}

// Reemplazar 'movie-list.txt' con la ruta correcta al archivo de lista de películas
processMoviesById("./movies.json");
