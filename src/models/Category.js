const {Model, DataTypes} = require ("sequelize");

class Category extends Model {
    //aqui inicializamos nossos campos da tabela
    static init(sequelize){
        super.init(
            {
                //apenas campos que podemos alterar/inserir
                description: DataTypes.STRING,
            },
            {
                sequelize,
            }
        )
    }
    //aqui configuramos os relacionamentos
    static associate(models){
        this.belongsToMany(models.Question, {through: "question_categories"});
    }
}
module.exports = Category;

//Model é o espelho da tabela de BD