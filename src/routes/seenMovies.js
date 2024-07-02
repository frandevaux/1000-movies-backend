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
  const { name, startId, endId } = req.query; // Cambio aquí para usar 'name'

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  // Construye el filtro de búsqueda para buscar 'name' tanto en 'title' como en 'originalTitle'
  let searchFilter = {};
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
      .find({ ...searchFilter, seen: true })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(start)) {
    movieSchema
      .find({ ...searchFilter, seen: true })
      .limit(end)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(end)) {
    movieSchema
      .find({ ...searchFilter, seen: true })
      .skip(start)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    movieSchema
      .find({ ...searchFilter, seen: true })
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

router.get("/movies/seen/ascName", async (req, res) => {
  const { startId, endId } = req.query;

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find({ seen: true })
      .sort({ title: 1 })
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
      .sort({ title: 1 })
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
      .sort({ title: 1 })
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
      .sort({ title: 1 })
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

router.get("/movies/seen/descName", async (req, res) => {
  const { startId, endId } = req.query;

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find({ seen: true })
      .sort({ title: -1 })
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
      .sort({ title: -1 })
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
      .sort({ title: -1 })
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
      .sort({ title: -1 })
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

router.get("/movies/seen/ascOrginalName", async (req, res) => {
  const { startId, endId } = req.query;

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find({ seen: true })
      .sort({ original_title: 1 })
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
      .sort({ original_title: 1 })
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
      .sort({ original_title: 1 })
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
      .sort({ original_title: 1 })
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

router.get("/movies/seen/descOrginalName", async (req, res) => {
  const { startId, endId } = req.query;

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find({ seen: true })
      .sort({ original_title: -1 })
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
      .sort({ original_title: -1 })
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
      .sort({ original_title: -1 })
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
      .sort({ original_title: -1 })
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

router.get("/movies/seen/ascYear", async (req, res) => {
  const { startId, endId } = req.query;

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find({ seen: true })
      .sort({ release_date: 1 })
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
      .sort({ release_date: 1 })
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
      .sort({ release_date: 1 })
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
      .sort({ release_date: 1 })
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

router.get("/movies/seen/descYear", async (req, res) => {
  const { startId, endId } = req.query;

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find({ seen: true })
      .sort({ release_date: -1 })
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
      .sort({ release_date: -1 })
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
      .sort({ release_date: -1 })
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
      .sort({ release_date: -1 })
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

module.exports = router;
