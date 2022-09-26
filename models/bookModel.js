const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: { type: String },
  author: { type: String },
  genre: { type: String },
  date_publish: { type: Date },
  createdAt: { type: Date, default: Date.now() },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
