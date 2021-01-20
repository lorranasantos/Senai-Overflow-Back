// const Answer = require("../models/Answer");
const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports = {
    index(req, res){

    },

    async store(req, res){
        const {description} = req.body;
        const {studentId} = req;
        const questionId = req.params.id;

        try{
            const question = await Question.findByPk(questionId);

            // Verifica se a pergunta existe
            if(!question)
                return res.status(404).send({error: "Pergunta não encontrada"});

            // Se a pergunta não existir, retorna erro
            const answer = await question.createAnswer({description, student_id: studentId });

            // retorno de sucesso
            res.status(200).send(answer);
        }
        catch(error){
            console.log(error);
            res.status(500).send(error);
        }
    },
}