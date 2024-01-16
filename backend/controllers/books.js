// Importation des modules nécessaires
const Book = require('../models/books');
const fs = require('fs');

// Fonction de création d'un livre
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;

    // Création d'un nouvel objet Book avec les données fournies
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    // Enregistrement du livre dans la base de données
    book.save()
        .then(() => {
            res.status(201).json({
                message: 'Livre enregistré avec succès!'
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            });
        });
};

// Fonction pour obtenir les détails d'un livre
exports.getOneBook = (req, res, next) => {
    Book.findOne({
        _id: req.params.id
    })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error: 'Problème lors de la récupération du livre' }));
};

// Fonction de modification d'un livre
exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;

    // Recherche du livre dans la base de données par son identifiant
    Book.findOne({_id: req.params.id})
        .then((book) => {
            // Vérification de l'autorisation de modification (appartenance à l'utilisateur)
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Non autorisé'});
            } else {
                // Mise à jour des données du livre
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                    .then(() => res.status(200).json({ message : 'Livre modifié avec succès!'}))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Fonction de suppression d'un livre
exports.deleteBook = (req, res, next) => {
    // Recherche du livre dans la base de données par son identifiant
    Book.findOne({ _id: req.params.id})
        .then(book => {
            // Vérification de l'autorisation de suppression (appartenance à l'utilisateur)
            if (book.userId != req.auth.userId) {
                res.status(401).json({message: 'Non autorisé'});
            } else {
                // Suppression du fichier image associé
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    // Suppression du livre dans la base de données
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





