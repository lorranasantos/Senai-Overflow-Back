const express = require("express");

const alunoController = require("./controllers/alunos");
const perguntaController = require("./controllers/pergunta");
const answersController = require("./controllers/answer");

const routes = express.Router();



//configuração da rota
//ROTAS DE ALUNOS
routes.get("/alunos", alunoController.listarAlunos);
routes.get("/alunos/:id", alunoController.buscarAluno);
routes.post("/alunos", alunoController.adicionarAlunos);
routes.delete("/alunos/:id", alunoController.deletarAluno);
routes.put("/alunos/:id", alunoController.editarAluno);

// ROTAS DE PERGUNTAS
routes.post("/perguntas", perguntaController.store);
routes.put("/perguntas/:id", perguntaController.update);
routes.delete("/perguntas/:id", perguntaController.delete);

// ROTAS DE RESPOSTAS
routes.post("/perguntas/:id/respostas", answersController.store);

module.exports = routes;