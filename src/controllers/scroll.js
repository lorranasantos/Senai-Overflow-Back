const Question = require("./questions");
const Answer = require("./answer");
const Feed = require("./feed");

module.exports = {
  async index(req, res) {
    const feedScroll = await Question.findByPk("questionId");

    //    Testar o react-lazy
  },
};
