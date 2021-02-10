const { Model, DataTypes } = require("sequelize");

class Student extends Model {
  //aqui inicializamos nossos campos da tabela
  static init(sequelize) {
    super.init(
      {
        //apenas campos que podemos alterar/inserir
        ra: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
  //aqui configuramos os relacionamentos
  static associate(models) {
    this.hasMany(models.Question);
    this.hasMany(models.Answer);
  }
}
module.exports = Student;

//Model é o espelho da tabela de BD
