const fs = require("fs");
const axios = require("axios");

async function loadMoviesDb() {
  try {
    // Read the JSON file
    const jsonData = fs.readFileSync(
      "C:/Users/User/Desktop/Codigos/1000-movies/backend/src/movieDataUtils/moviesDetails.json",
      "utf8"
    );
    const movies = JSON.parse(jsonData);

    // Iterate over each movie object
    for (const movie of movies) {
      // Make a POST request to the API
      const response = await axios.post(
        "http://localhost:9000/api/movie",
        movie
      );
      console.log(
        `Movie "${movie.title}" added successfully. Response:`,
        response.data
      );
    }

    console.log("All movies added to the database.");
  } catch (error) {
    console.error("Error loading movies:", error);
  }
}

loadMoviesDb();
