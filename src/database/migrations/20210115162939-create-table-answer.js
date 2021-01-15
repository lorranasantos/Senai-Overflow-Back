'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("answers",{
      id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      description:{
        type:Sequelize.TEXT,
        allowNull: false,
      },
      question_id:{
        type: Sequelize.INTEGER,
        references:{
          model: "perguntas",
          key:"id",
          allowNull: false,
        }
      },
      student_id:{
        type: Sequelize.INTEGER,
        references:{
          model: "tblalunos",
          key:"id",
          allowNull: false,
        }
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("answers");
  }
};
