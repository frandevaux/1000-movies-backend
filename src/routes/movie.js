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

// Update movie by name

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

module.exports = router;
