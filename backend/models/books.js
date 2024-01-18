// 1--Importation du module mongoose
const mongoose = require('mongoose');

// 2--Définition du schéma de données pour les livres
const BookSchema = mongoose.Schema({
    userId: { type: String, required: true }, // Identifiant de l'utilisateur associé au livre
    title: { type: String, required: true }, // Titre du livre
    author: { type: String, required: true }, // Auteur du livre
    imageUrl: { type: String, required: true }, // URL de l'image du livre
    year: { type: Number, required: true }, // Année de publication du livre
    genre: { type: String, required: true }, // Genre du livre
    ratings: [
        {
            userId: { type: String, required: true }, // Identifiant de l'utilisateur qui a donné la note
            grade: { type: Number, required: true } // Note attribuée par l'utilisateur
        }
    ],
    averageRating: { type: Number, required: true } // Note moyenne du livre
});

// 3--Exportation du modèle Book basé sur le schéma défini
module.exports = mongoose.model('Book', BookSchema);
