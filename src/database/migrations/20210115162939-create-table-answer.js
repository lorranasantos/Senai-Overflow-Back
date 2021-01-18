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
          model: "questions",
          key:"id",
          allowNull: false,
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE"
      },
      student_id:{
        type: Sequelize.INTEGER,
        references:{
          model: "students",
          key:"id",
          allowNull: false,
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE"
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
