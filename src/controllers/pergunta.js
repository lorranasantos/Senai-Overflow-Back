const { update } = require("../models/Student");

const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports = {
    index(req, res) {

    },
    async store(req, res) {
        const { titulo, descricao, imagem, gist, categorias } = req.body;

        const alunoId = req.headers.authorization;

        try {
            // buscar o aluno pelo iD
            let aluno = await Student.findByPk(alunoId);

            // se o aluno não existir , retorna erro
            if (!aluno)
                return res.status(400).send({ erro: "Aluno não encontrado" });

            // crio a pergunta para o aluno
            let pergunta = await aluno.createQuestion({ titulo, descricao, imagem, gist});

            await pergunta.addCategories(categorias);

            // retorno sucesso
            res.status(201).send(pergunta);
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    find(req, res) {

    },
    async update(req, res) {
        const questionId = req.params.id;

        const{titulo, descricao} = req.body;

        const studentId = req.headers.authorization;

        try{
            const question = await Question.findOne({
                where: {
                    aluno_id: studentId,
                    id: questionId
                }
            });

            if(!question)
                res.status(404).send({ erro: "Questão não encontrada"});

            question.titulo = titulo;
            question.descricao = descricao;
            question.save();
            
            res.status(200).send("Pergunta atualizada com sucesso!");
        }
        catch(error){
            console.log(error);
            res.status(500).send(error);
        }  
    },
    async delete(req, res) {
        const questionId = req.params.id;
        const studentId = req.headers.authorization;

        try{
            const question = await Question.findOne({
                where: {
                    aluno_id: studentId,
                    id: questionId
                }
            });

            if(!question)
                res.status(404).send({ erro: "Questão não encontrada"});

            await question.destroy();

            res.status(200).send("Pergunta deletada com sucesso!");
        }
        catch(error){
            console.log(error);
            res.status(500).send(error);
        }  
    }
}