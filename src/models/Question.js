const {Model, DataTypes} = require ("sequelize");

class Question extends Model {
    //aqui inicializamos nossos campos da tabela
    static init(sequelize){
        super.init(
            {
                //apenas campos que podemos alterar/inserir
                title: DataTypes.STRING,
                description: DataTypes.STRING,
                image:DataTypes.STRING,
                gist:DataTypes.STRING
            },
            {
                sequelize,
            }
        )
    }
    //aqui configuramos os relacionamentos
    static associate(models){
        this.belongsTo(models.Student);
        this.belongsToMany(models.Category, {through: "question_categories"});
        this.hasMany(models.Answer);
    }
}
module.exports = Question;

//Model é o espelho da tabela de BD