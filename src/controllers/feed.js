const { index } = require("./answer");
const Question = require("../models/Question");

module.exports = {
  async index(req, res) {
    try {
      const feed = await Question.findAll({
        attributes: [
          "id",
          "title",
          "description",
          "image",
          "gist",
          "created_at",
        ],
        include: [
          {
            association: "Student",
            attributes: ["id", "name", "image"],
          },
          {
            association: "Categories",
            through: { attributes: [] },
            attributes: ["id", "description"],
          },
          {
            association: "Answers",
            attributes: ["id", "description", "created_at"],
            include: {
              association: "Student",
              attributes: ["id", "name", "image"],
            },
          },
        ],
        order: [["created_at", "DESC"]],
        limit: 5,
        offset: 5,
      });
      res.send(feed);
    } catch {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
