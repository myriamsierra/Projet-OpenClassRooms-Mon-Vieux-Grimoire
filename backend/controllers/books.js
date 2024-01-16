
const Book = require('../models/books');

exports.createBook = (req, res, next) => {
    const book = new Book({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId,
        author: req.body.author,
        year: req.body.year,
        genre: req.body.genre,
        averageRating: req.body.averageRating,
        ratings: req.body.ratings
    });

    book.save().then(
        () => {
          res.status(201).json({
            message: 'Post saved successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    

};
exports.getOneBook = (req, res, next) => {
    Book.findOne({
        _id: req.params.id
    })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error:'problem getbook' }));
};


exports.modifyBook = (req, res, next) => {
    const book = new Book({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId,
        author: req.body.author,
        year: req.body.year,
        genre: req.body.genre,
        averageRating: req.body.averageRating,
        ratings: req.body.ratings
    });
   
    Book.updateOne({ _id: req.params.id }, book)
    .then(() => res.status(201).json({ message: 'Book updated successfully!' }))
    .catch((error) => res.status(400).json({ error : 'book cant be updated' }));
};


exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Deleted!' }))
        .catch((error) => res.status(400).json({ error:'book cant be deleted' }));
};


exports.getAllBook = (req, res, next) => {
    Book.find()
      .then((book) => res.status(200).json(book))
      .catch((error) => res.status(400).json({ error :'cant get allbook'}));
};





