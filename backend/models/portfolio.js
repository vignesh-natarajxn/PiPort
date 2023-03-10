const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: false },
  image: { type: String, required: false },
  components: [
    {
      id: { type: Number, required: true },
      isHeader: { type: Boolean, required: true },
      title: { type: String, required: false },
      date: { type: String, required: false },
      description: { type: String, required: false },
      image: { type: String, required: false },
    },
  ],
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
