const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  creator: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: false },
  components: [
    {
      title: { type: String, required: true },
      description: { type: String, required: false },
      image: { type: String, required: false },
      components: [
        {
          title: { type: String, required: true },
          description: { type: String, required: false },
          image: { type: String, required: false },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
