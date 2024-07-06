const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");
const movieRoutes = require("./routes/movie");
const moviesRoutes = require("./routes/allMovies");
const seenMoviesRoutes = require("./routes/seenMovies");
const authRoutes = require("./routes/auth.routes.js");
require = require("esm")(module);
const { connectDB } = require("./db");

const app = express();

const PORT = process.env.API_PORT || 9000;

// Middlewares

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use("/api", movieRoutes, moviesRoutes, seenMoviesRoutes, authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
