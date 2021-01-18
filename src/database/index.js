const sequelize = require("sequelize");
const dbconfig = require("../config/database");

//imports dos models
const Student = require("../models/Student");
const Question = require("../models/Question");
const Category = require("../models/Category");
const Answer = require("../models/Answer");
const { Sequelize } = require("sequelize");

const cennection = new Sequelize(dbconfig);

//inicializa os models
Student.init(cennection);
Question.init(cennection);
Category.init(cennection);
Answer.init(cennection);


//inicializa os relacionamentos
Student.associate(cennection.models);
Question.associate(cennection.models);
Category.associate(cennection.models);
Answer.associate(cennection.models);
