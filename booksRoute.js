const Book = require("./models/bookModel");
const booksRouter = require("express").Router();

booksRouter.get("/all", (req, res) => {
  Book.find({}, (err, books) => {
    if (err) console.error(err);
    res.render("books", { books: books });
  });
});

booksRouter.get("/new", (req, res) => {
  res.render("_form");
});
booksRouter.post("/new", (req, res) => {
  let newBook = new Book(req.body);
  // let newBook = {
  //   name: req.body.name,
  //   author: req.body.author,
  //   genre: req.body.genre,
  //   date_publish: req.body.date_publish,
  // }
  // booksDb.push(newBook)
  newBook.save((err, book) => {
    if (err) console.error(err);
    res.send({ message: "Book added!", book });
  });
});

booksRouter
  .route("/:id")
  .get((req, res) => {
    Book.findById({ _id: req.params.id }, (err, book) => {
      if (err) console.error(err);
      res.send(book);
    });
  })
  .put((req, res) => {
    Book.findById({ _id: req.params.id }, (err, book) => {
      if (err) console.error(err);
      Object.assign(book, req.body).save((err, book) => {
        if (err) console.error(err);
        res.redirect("/books/all");
      });
    });
  })
  .delete((req, res) => {
    Book.remove({ _id: req.params.id }, (err, book) => {
      if (err) console.error(err);
      res.send({ message: "Book successfully removed !!" });
    });
  });
booksRouter.route("/:id/edit").get((req, res) => {
  Book.findById({ _id: req.params.id}, (err,book)=> {
    if(err) console.error(err);
    res.render("_edit",{book:book});
  })
});

module.exports = booksRouter;
