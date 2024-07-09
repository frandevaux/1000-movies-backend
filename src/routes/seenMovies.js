const express = require("express");

const router = express.Router();
const movieSchema = require("../models/movie.model");
const authRequired = require("../middlewares/validateToken");
const { searchSeen } = require("../controllers/seenMovies.controller");
// Get  seen movies

router.get("/movies/seen", async (req, res) => {
  const { startId, endId } = req.query;

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find({ seen: true })
      .then((data) => {
        console.log(data);
        if (data.length === 0) {
          res.status(404).json({ message: "No se encontraron más películas." });
        } else {
          res.json(data);
        }
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(start)) {
    movieSchema
      .find({ seen: true })
      .limit(end)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(end)) {
    movieSchema
      .find({ seen: true })
      .skip(start)

      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    movieSchema
      .find({
        seen: true,
      })
      .skip(start)
      .limit(end)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  }
});

router.get("/movies/seen/search", authRequired, searchSeen);

module.exports = router;
