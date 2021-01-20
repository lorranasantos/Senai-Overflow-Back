const express = require("express");
const Multer = require("multer");

const authMiddleware = require("./middleware/authorization");

const studentController = require("./controllers/students");
const questionController = require("./controllers/questions");
const answersController = require("./controllers/answer");
const feedController = require("./controllers/feed");
const sessionController = require("./controllers/sessions");

const studentsValidator = require("./validators/students");
const questionValidator = require("./validators/questions");
const answerValidator = require("./validators/answers");

const routes = express.Router();

const multer = Multer({
    storage: Multer.diskStorage({
        destination: "uploads/",
        filename:(req, file, callback) =>{
            const filename = Date.now() + "." + file.originalname.split(".").pop();

           return callback(null,filename);
        }
    })
});

routes.post("/upload", multer.single("arquivo"), (req, res)=>{
    console.log(req.file);
    res.send(req.file);
})

//configuração da rota
// Rotas PÚBLICAS
routes.post("/sessions", sessionController.store);
routes.post("/students", studentsValidator.create, studentController.store);

routes.use(authMiddleware);

//ROTAS DE students
routes.get("/students/:id", studentController.find);
routes.get("/students", studentController.index);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

// ROTAS DE questions
routes.post("/questions", questionValidator.create, questionController.store);
routes.put("/questions/:id", questionController.update);
routes.delete("/questions/:id", questionController.delete);

// ROTAS DE RESPOSTAS
routes.post("/questions/:id/answers", answerValidator.create, answersController.store);

// ROTAS DO FEED
routes.get("/feed", feedController.index);

module.exports = routes;