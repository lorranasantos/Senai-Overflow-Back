const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth.json");
const { generateToken } = require("../util");

// const { findCreateFind } = require("../models/Student");

module.exports = {
  //função que vai ser executada pela rota
  async index(req, res) {},

  async store(req, res) {
    //receber os dados do body
    const { ra, name, email, password } = req.body;

    try {
      //SELECT * FROM tblalunos WHERE  ra ? AND email - ?
      let student = Student.findOne({
        where: { ra: ra, email: email },
      });
      if (!student) res.status(400).send({ error: "aluno já cadastrado" });

      const passwordCrypt = bcrypt.hashSync(password);

      student = await Student.create({
        ra,
        name,
        email,
        password: passwordCrypt,
      });

      const token = generateToken({
        studentId: student.id,
        studentName: student.name,
      });

      /*implementar o último id
            const nextID = alunos.length > 0 ? alunos[alunos.length -1].id + 1: 1;*/
      /*adicionar o aluno na lista
            alunos.push({id: nextID, ra, nome, email, senha });*/

      //retornando uma resposta de sucesso
      res.status(201).send({
        student: {
          studentId: student.id,
          name: student.name,
          ra: student.ra,
          email: student.email,
        },
        token,
      });
    } catch (error) {
      // console.log("erro");
      res.status(400).send("");
    }
  },

  async find(req, res) {
    //recuperar o id do aluno
    const studentId = req.params.id;

    /*buscar o aluno na lista
        const aluno = alunos.find(a => a.id.toString() === studentId);*/
    let student = await Student.findByPk(studentId, {
      attributes: ["id", "name", "ra", "email"],
    });

    //se o student não for encontrado, retornar o not found
    if (!student) return res.status(404).send({ erro: "Aluno não encontrado" });

    //Se o aluno encontrado retornar o aluno
    delete aluno.senha;

    res.send(aluno);
  },

  async delete(req, res) {
    //recuperar o id do aluno a ser deletado
    const studentId = req.params.id;

    /*retirar o aluno da lista
        alunos = alunos.filter(a => a.id.toString() !== studentId);*/
    try {
      let student = await Student.findByPk(studentId);
      if (!student)
        return res.status(404).send({ error: "aluno não encontrado" });
      await student.destroy();

      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }

    //devolver resposta de sucesso
    res.status(204).send();
  },

  async update(req, res) {
    //recuperar o id do aluno a ser editado
    const studentId = req.params.id;

    const { name, email } = req.body;
    /*recuperar os dados do corpo
        fazer a alteração
        alunos = alunos.map(
            a => a.id.toString() === studentId ? {...a, nome, email} : a
            );*/
    try {
      console.log(1);
      let student = await Student.findByPk(studentId);

      if (!student) res.status(404).send({ error: "Aluno não encontrado" });

      student.name = name;
      student.email = email;

      student.save();

      //devolver a resposta de sucesso
      res.status(204).send(student);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
