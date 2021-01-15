const sequelize = require("sequelize");
const dbconfig = require("../config/database");

//imports dos models
const Student = require("../models/Student");
const Question = require("../models/Question");
const Category = require("../models/Category");
const Answer = require("../models/Answer");
const { Sequelize } = require("sequelize");

const conexao = new Sequelize(dbconfig);

//inicializa os models
Student.init(conexao);
Question.init(conexao);
Category.init(conexao);
Answer.init(conexao);


//inicializa os relacionamentos
Student.associate(conexao.models);
Question.associate(conexao.models);
Category.associate(conexao.models);
Answer.associate(conexao.models);
