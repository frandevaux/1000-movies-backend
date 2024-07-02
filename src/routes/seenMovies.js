const express = require("express");

const router = express.Router();
const movieSchema = require("../models/movie");

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

router.get("/movies/seen/search", async (req, res) => {
  const {
    name,
    startId,
    endId,
    titleFilter,
    originalTitleFilter,
    releaseFilter,
  } = req.query; // Cambio aquí para usar 'name'

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  // Construye el filtro de búsqueda para buscar 'name' tanto en 'title' como en 'originalTitle'
  let sortCriteria = {};

  // Añadir criterio de ordenamiento para 'title' si está definido
  if (titleFilter === "asc") {
    sortCriteria.title = 1;
  } else if (titleFilter === "desc") {
    sortCriteria.title = -1;
  } else {
    if (originalTitleFilter === "asc") {
      sortCriteria.original_title = 1;
    } else if (originalTitleFilter === "desc") {
      sortCriteria.original_title = -1;
    } else {
      if (releaseFilter === "asc") {
        sortCriteria.release_date = 1;
      } else if (releaseFilter === "desc") {
        sortCriteria.release_date = -1;
      } else {
        seen_date = -1;
      }
    }
  }
  console.log(sortCriteria);

  // Añadir criterio de ordenamiento para 'original_title' si está definido

  // Añadir criterio de ordenamiento para 'release_date' si está definido

  if (name) {
    searchFilter = {
      $or: [
        { title: { $regex: name, $options: "i" } },
        { original_title: { $regex: name, $options: "i" } },
      ],
    };
  }
  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find(name ? { ...searchFilter, seen: true } : { seen: true })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(start)) {
    movieSchema
      .find(name ? { ...searchFilter, seen: true } : { seen: true })
      .limit(end)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(end)) {
    movieSchema
      .find(name ? { ...searchFilter, seen: true } : { seen: true })
      .skip(start)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    movieSchema
      .find(name ? { ...searchFilter, seen: true } : { seen: true })
      .sort(sortCriteria)
      .skip(start)
      .limit(20)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  }
});

module.exports = router;
