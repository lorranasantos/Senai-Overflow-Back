const {Model, DataTypes} = require ("sequelize");

class Question extends Model {
    //aqui inicializamos nossos campos da tabela
    static init(sequelize){
        super.init(
            {
                //apenas campos que podemos alterar/inserir
                titulo: DataTypes.STRING,
                descricao: DataTypes.STRING,
                imagem:DataTypes.STRING,
                gist:DataTypes.STRING
            },
            {
                sequelize,
                tableName: "perguntas"
            }
        )
    }
    //aqui configuramos os relacionamentos
    static associate(models){
        this.belongsTo(models.Student, {foreignKey:"aluno_id"});
        this.belongsToMany(models.Category, {through: "question_categories"});
        this.hasMany(models.Answer);
    }
}
module.exports = Question;

//Model é o espelho da tabela de BD