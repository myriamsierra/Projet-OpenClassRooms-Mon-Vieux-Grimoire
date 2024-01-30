// 1--Importation des modules nécessaires
const Book = require('../models/books');
const fs = require('fs');

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    book.save()
    .then(() => res.status(201).json({ message: 'Livre enregistré avec succès!' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({
        _id: req.params.id
    })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error: 'Problème lors de la récupération du livre' }));
};


exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;

    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Non autorisé'});
            } else {
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                    .then(() => res.status(200).json({ message : 'Livre modifié avec succès!'}))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({message: 'Non autorisé'});
            } else {  
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                   
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Livre supprimé avec succès !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};

exports.getAllBook = (req, res, next) => {
    Book.find()
      .then((book) => res.status(200).json(book))
      .catch((error) => res.status(400).json({ error :'cant get allbook'}));
};


exports.getBestRatedBooks = (req, res, next) => {
    Book.find().sort({ averageRating: -1 }).limit(3)
        .then((books) => {
            console.log("Livres les mieux notés:", books);
            res.status(200).json(books);
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération des livres les mieux notés:", error);
            res.status(500).json({ error: 'Erreur lors de la récupération des livres les mieux notés' });
        });
};
