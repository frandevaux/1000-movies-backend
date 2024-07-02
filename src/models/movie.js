const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  genres: {
    type: Array,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  original_language: {
    type: String,
    required: true,
  },
  original_title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  cast: {
    type: Array,
    required: true,
  },
  director: {
    type: Object,
    required: true,
  },
  seen: {
    type: Boolean,
    required: true,
  },
  list_id: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
