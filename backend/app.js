const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./Models/http-error");

const usersRoutes = require("./routes/users-routes");

const postsRoutes = require("./routes/posts-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/posts", postsRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("No se encontro esta ruta", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Error desconocido" });
});

mongoose
  .connect('mongodb+srv://AdminMaxi:proyectofinal2021@cluster0.27mee.mongodb.net/posts?retryWrites=true&w=majority')
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

