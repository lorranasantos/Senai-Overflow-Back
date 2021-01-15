const { Model, DataTypes } = require("sequelize");


class Answer extends Model{

    static init(sequelize){
        super.init(
            {
                description: DataTypes.STRING,
                student_id:DataTypes.INTEGER
            },
            {
                sequelize,
            }
        )
    }
    static associate(models){
        this.belongsTo(models.Question);
        this.belongsTo(models.Student, {foreignKey: "student_id"});
    }
}
module.exports = Answer;