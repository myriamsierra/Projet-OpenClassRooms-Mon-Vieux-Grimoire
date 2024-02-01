///////////////////////////////CONTROLLERS BOOKS//////////////////////////////////

// 1--IMPORTATION DES MODULES NÉCESSAIRES
const Book = require('../models/books');
const fs = require('fs');


// 2--CONTROLLERS POUR CREER UN BOOK
exports.createBook = (req, res, next) => {
    const newBook = JSON.parse(req.body.book);     
    delete newBook._id;    
    delete newBook._userId;
    const book = new Book({     
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré avec succès!' }))
        .catch(error => res.status(400).json({ error }));
};


// 3--CONTROLLERS POUR AFFICHER UN SEUL BOOK
exports.getOneBook = (req, res, next) => {
    Book.findOne({
        _id: req.params.id
    })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};


// 4--CONTROLLERS POUR MODIFIER UN BOOK 
exports.modifyBook = (req, res, next) => {
    const changeBook = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete changeBook._userId;
    Book.findOne({_id: req.params.id})   
        // verif si le userID du book et le meme que celui de la requete
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Non autorisé'});
            } else {
                Book.updateOne({ _id: req.params.id}, { ...changeBook, _id: req.params.id})
                    .then(() => res.status(200).json({ message : 'Livre modifié avec succès!'}))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


// 5--CONTROLLERS POUR SUPPRIMER UN LIVRE
exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})  //recup du book avc son id
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


// 6--CONTROLLERS POUR AFFICHER TOUS LES BOOK 
exports.getAllBook = (req, res, next) => {
    Book.find()
        .then((book) => res.status(200).json(book))
        .catch((error) => res.status(400).json({ error }));
};


// 7-- CONTROLLERS POUR NOTER UN LIVRE
exports.rateBook = async (req, res, next) => {
    const bookId = req.params.id;
    try {
        const book = await Book.findById(bookId);     //recup du livre par son id
        const { userId, rating } = req.body;
        const userRating = book.ratings.find((rating) => rating.userId === userId);   // verif si le user a deja noté le livre avc l'id 
        if (userRating) {
            return res.status(400).json({ error: 'Vous avez déjà noté ce livre' });
        }
        //calcul de la moyenne
        book.ratings.push({ userId, grade: rating });        // push de la note dds la bdd
        const numberOfRatings = book.ratings.length;     //total du nbr de note
        const totalNumbers = book.ratings.reduce((accumulator, rating) => accumulator + rating.grade, 0);   
        book.averageRating = Math.round(totalNumbers / numberOfRatings);       // arrondi de la moyenne
        //sauvegarde ds la bdd
        await book.save();
        return res.status(200).json({ message: 'Livre noté avec succès'});
    } catch (error) {
        return res.status(500).json({ error});
    }
};


// 8--CONTROLLERS POUR RÉCUPÉRER LA NOTE MOYENNE 
exports.getAverageRating = (req, res, next) => {
    const bookId = req.params.id;
    Book.findById(bookId)
        .then((book) => {
            const totalRatings = book.ratings.length;
            if (totalRatings === 0) {
                return res.status(200).json({ averageRating: 0 });
            }
            const sumRatings = book.ratings.reduce((acc, rating) => acc + rating.grade, 0);
            const averageRating = sumRatings / totalRatings;
            return res.status(200).json({ averageRating });
        })
        .catch((error) => {
            return res.status(500).json({ error });
        });
};


// 9--RÉCUPÉRATION DES TROIS MEILLEURS LIVRES NOTÉS
exports.getBestRatedBooks = (req, res, next) => {
    Book.find()
        .sort({ averageRating: -1 })
        .limit(3) 
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(500).json({ error: 'Error fetching best-rated books' }));
};
