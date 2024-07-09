const express = require("express");

const router = express.Router();
const movieSchema = require("../models/movie.model");

// Create movie

router.post("/movie", async (req, res) => {
  const movie = new movieSchema(req.body);
  console.log(req.body);
  movie
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

// Get movie by id

router.get("/movie/:id", async (req, res) => {
  const { id } = req.params;
  movieSchema
    .find({ id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/movie/list_id/:id", async (req, res) => {
  const { id } = req.params;
  movieSchema
    .find({ list_id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

// Update movie by id

router.put("/movie/:id", async (req, res) => {
  const { id } = req.params;
  movieSchema
    .updateOne({ id: id }, { $set: req.body })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

// Update movie by list_id

router.put("/movie/list_id/:list_id", async (req, res) => {
  console.log(req.body);
  const { list_id } = req.params;
  movieSchema
    .updateOne({ list_id: list_id }, { $set: req.body })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

// Delete movie by id

router.delete("/movie/:id", async (req, res) => {
  const { id } = req.params;
  movieSchema
    .deleteOne({ id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

// Delete movie by list_id

router.delete("/movie/list_id/:list_id", async (req, res) => {
  const { list_id } = req.params;
  movieSchema
    .deleteMany({ list_id: list_id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/missing-list-ids", async (req, res) => {
  let missingListIds = [];

  for (let id = 1; id <= 1000; id++) {
    try {
      const movieExists = await movieSchema.findOne({ list_id: id });
      if (!movieExists) {
        missingListIds.push(id);
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al verificar los list_id", error });
    }
  }

  res.json({ missingListIds });
});

router.get("/repeated-list-ids", async (req, res) => {
  let listIdOccurrences = {};

  for (let id = 1; id <= 1000; id++) {
    try {
      const movies = await movieSchema.find({ list_id: id });
      if (movies.length > 1) {
        listIdOccurrences[id] = movies.length;
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al verificar los list_id", error });
    }
  }

  const repeatedListIds = Object.keys(listIdOccurrences).map((id) => ({
    list_id: id,
    occurrences: listIdOccurrences[id],
  }));

  res.json({ repeatedListIds });
});

router.post("/random-movie", async (req, res) => {
  try {
    // Asume que el cuerpo del pedido contiene un array de IDs de películas vistas
    const { seenMovies } = req.body; // Obtiene el array de IDs del cuerpo del pedido
    console.log(seenMovies);
    const randomMovie = await movieSchema.aggregate([
      { $match: { id: { $nin: seenMovies } } }, // Excluye las películas vistas
      { $sample: { size: 1 } }, // Selecciona una película al azar de las no vistas
    ]);
    console.log(randomMovie);

    if (randomMovie.length) {
      res.json(randomMovie[0]); // $sample devuelve un array, así que obtenemos el primer elemento
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron películas no vistas" });
    }
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      message: "Error al obtener una película aleatoria no vista",
      error,
    });
  }
});

module.exports = router;
