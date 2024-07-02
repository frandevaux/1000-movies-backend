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
      .find(searchFilter)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(start)) {
    movieSchema
      .find(searchFilter)
      .limit(end)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(end)) {
    movieSchema
      .find(searchFilter)
      .skip(start)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    movieSchema
      .find(searchFilter)
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

router.get("/movies/ascName", async (req, res) => {
  const { startId, endId } = req.query;

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find()
      .sort({ title: 1 })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(start)) {
    movieSchema
      .find()
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
      .find()
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
      .find()
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

router.get("/movies/descName", async (req, res) => {
  const { startId, endId } = req.query;

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find()
      .sort({ title: -1 })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(start)) {
    movieSchema
      .find()
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
      .find()
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
      .find()
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

router.get("/movies/ascOriginalName", async (req, res) => {
  const { startId, endId } = req.query;

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find()
      .sort({ original_title: 1 })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(start)) {
    movieSchema
      .find()
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
      .find()
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
      .find()
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

router.get("/movies/descOriginalName", async (req, res) => {
  const { startId, endId } = req.query;

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find()
      .sort({ original_title: -1 })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(start)) {
    movieSchema
      .find()
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
      .find()
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
      .find()
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

router.get("/movies/ascYear", async (req, res) => {
  const { startId, endId } = req.query;

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find()
      .sort({ release_date: 1 })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(start)) {
    movieSchema
      .find()
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
      .find()
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
      .find()
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

router.get("/movies/descYear", async (req, res) => {
  const { startId, endId } = req.query;

  // Asegúrate de que los parámetros de consulta sean números
  const start = parseInt(startId, 10);
  const end = parseInt(endId, 10);

  if (isNaN(start) && isNaN(end)) {
    movieSchema
      .find()
      .sort({ release_date: -1 })
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  } else if (isNaN(start)) {
    movieSchema
      .find()
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
      .find()
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
      .find()
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
