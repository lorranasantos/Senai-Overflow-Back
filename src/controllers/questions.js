const { update } = require("../models/Student");

const Question = require("../models/Question");
const Student = require("../models/Student");

module.exports = {
  index(req, res) {},

  async store(req, res) {
    const { title, description, gist, categories } = req.body;

    const categoriesArray = categories.split(",");
    // const {firebaseUrl}  = req.file ? req.file : "";

    const { studentId } = req;

    try {
      // buscar o aluno pelo iD
      let student = await Student.findByPk(studentId);

      // se o student não existir , retorna erro
      if (!student)
        return res.status(400).send({ error: "aluno não encontrado" });

      // crio a pergunta para o aluno
      let question = await student.createQuestion({
        title,
        description,
        image: req.file.firebaseUrl,
        gist,
      });

      await question.addCategories(categoriesArray);

      // retorno sucesso
      res.status(201).send({
        id: question.id,
        title: question.title,
        description: question.description,
        created_at: question.created_at,
        gist: question.gist,
        image: req.file ? req.file.firebaseUrl : null,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  find(req, res) {},
  async update(req, res) {
    const questionId = req.params.id;

    const { title, description } = req.body;

    const { studentId } = req;

    try {
      // const question = await Question.findOne({
      //     where: {
      //         student_id: studentId,
      //         id: questionId
      //     }
      // });

      const question = await Question.findByPk(questionId);

      if (!question)
        return res.status(404).send({ error: "Questão não encontrada" });

      if (!question.studentId != studentId)
        return res.status(404).send({ error: "Não autorizado" });

      question.title = title;
      question.description = description;
      question.save();

      res.status(200).send("Pergunta atualizada com sucesso!");
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async delete(req, res) {
    const questionId = req.params.id;
    const { studentId } = req;

    try {
      const question = await Question.findOne({
        where: {
          student_id: studentId,
          id: questionId,
        },
      });

      if (!question) res.status(404).send({ error: "Questão não encontrada" });

      await question.destroy();

      res.status(200).send("Pergunta deletada com sucesso!");
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
