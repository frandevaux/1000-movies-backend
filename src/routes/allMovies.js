const express = require("express");

const router = express.Router();
const movieSchema = require("../models/movie");

// Get all movies

router.get("/movies", async (req, res) => {
  const { startId, endId } = req.query;

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(start)) {
    movieSchema
      .find()
      .limit(end)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(end)) {
    movieSchema
      .find()
      .skip(start)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    movieSchema
      .find()
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

router.get("/movies/search", async (req, res) => {
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
  }

  // Añadir criterio de ordenamiento para 'original_title' si está definido
  if (originalTitleFilter === "asc") {
    sortCriteria.original_title = 1;
  } else if (originalTitleFilter === "desc") {
    sortCriteria.original_title = -1;
  }

  // Añadir criterio de ordenamiento para 'release_date' si está definido
  if (releaseFilter === "asc") {
    sortCriteria.release_date = 1;
  } else if (releaseFilter === "desc") {
    sortCriteria.release_date = -1;
  }
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
      .find(name ? searchFilter : {})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(start)) {
    movieSchema
      .find(name ? searchFilter : {})
      .limit(end)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(end)) {
    movieSchema
      .find(name ? searchFilter : {})
      .skip(start)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    movieSchema
      .find(name ? searchFilter : {})
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
