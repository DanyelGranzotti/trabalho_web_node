const methodOverride = require("method-override");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = require("../index");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const PORT = process.env.PORT || 6969;

mongoose
  .connect(
    "mongodb+srv://danyelgranzotti:senhapokemon@pokemoncluster.z88fd.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((err) => {
    console.log("Mongo Connection Error");
    console.log(err);
  });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.listen(PORT, () => console.log(`Server is running on porta ${PORT}`));
