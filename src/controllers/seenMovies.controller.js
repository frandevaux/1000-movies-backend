const movieSchema = require("../models/movie.model");
const { createAccessToken } = require("../libs/jwt");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const searchSeen = async (req, res) => {
  const {
    name,
    startId,
    endId,
    titleFilter,
    originalTitleFilter,
    releaseFilter,
  } = req.query;

  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  let sortCriteria = {};

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
        sortCriteria.seen_date = -1;
      }
    }
  }

  let searchFilter = {};
  if (name) {
    searchFilter = {
      $or: [
        { title: { $regex: name, $options: "i" } },
        { original_title: { $regex: name, $options: "i" } },
      ],
    };
  }

  const query = movieSchema.find(
    name ? { ...searchFilter, seen: true } : { seen: true }
  );

  query.sort({ ...sortCriteria, seen_date: -1 });

  if (!isNaN(start)) {
    query.skip(start);
  }

  if (!isNaN(end)) {
    query.limit(end);
  } else {
    query.limit(20);
  }

  try {
    const data = await query.exec();
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  searchSeen,
};
