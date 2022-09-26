const express = require("express");

const app = express();

const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/livredb")
const db = mongoose.connection;
db.on("error", err => console.error.bind(console, "connection error"))
db.once("open", () => console.log(`🎯 [MongoDB is connected !!]`))

const bookRouter = require("./booksRoute");

app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("test");
});

app.use("/books", bookRouter);

app.listen(port, console.log(`🐳 [Tout est opérationel !]`));
 