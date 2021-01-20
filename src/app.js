
//importar express
const express = require("express");
const { errors } = require("celebrate");

//importar as rotas
const routes  = require("./routes");

require("./database");

//Cria a aplicação express
const app = express();

app.use(express.json());

app.use(routes);

app.use(errors());

module.exports = app;
