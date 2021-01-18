const express = require("express");

const studentController = require("./controllers/students");
const questionController = require("./controllers/questions");
const answersController = require("./controllers/answer");
const feedController = require("./controllers/feed");

const routes = express.Router();



//configuração da rota
//ROTAS DE students
routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
routes.post("/students", studentController.store);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

// ROTAS DE questions
routes.post("/questions", questionController.store);
routes.put("/questions/:id", questionController.update);
routes.delete("/questions/:id", questionController.delete);

// ROTAS DE RESPOSTAS
routes.post("/questions/:id/answers", answersController.store);

// ROTAS DO FEED
routes.get("/feed", feedController.index);

module.exports = routes;