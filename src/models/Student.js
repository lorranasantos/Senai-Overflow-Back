const {Model, DataTypes} = require ("sequelize");

class Student extends Model {
    //aqui inicializamos nossos campos da tabela
    static init(sequelize){
        super.init(
            {
                //apenas campos que podemos alterar/inserir
                ra: DataTypes.STRING,
                nome: DataTypes.STRING,
                email:DataTypes.STRING,
                senha:DataTypes.STRING
            },
            {
                tableName: "tblalunos",
                sequelize,
            }
        )
    }
    //aqui configuramos os relacionamentos
    static associate(models){
        this.hasMany(models.Question, {foreignKey:"aluno_id"});
        this.hasMany(models.Answer, {foreignKey:"student_id"});
    }
}
module.exports = Student;

//Model é o espelho da tabela de BD