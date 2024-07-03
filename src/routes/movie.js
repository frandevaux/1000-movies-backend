const express = require("express");

const router = express.Router();
const movieSchema = require("../models/movie");

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

module.exports = router;
