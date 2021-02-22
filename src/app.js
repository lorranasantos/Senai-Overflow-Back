//importar express
const express = require("express");
const { errors } = require("celebrate");

const cors = require("cors");

require("dotenv").config();

//console.log(process.env.TESTE);

//importar as rotas
const routes = require("./routes");

require("./database");

//Cria a aplicação express
const app = express();

app.use(express.json());

app.use(cors());

// Definimos a pasta upload como pública, servindo arquivos estáticos.
app.use("/uploads", express.static("uploads"));

app.use(routes);

app.use(errors());

module.exports = app;
