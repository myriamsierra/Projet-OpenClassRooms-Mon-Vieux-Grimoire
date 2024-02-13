////////////////////////BOOKS MODELS/////////////////////////////

// 1--IMPORTATION DE MONGOOSE POUR LA GESTION DES DONNÉES MONGODB
const mongoose = require('mongoose');

// 2--DÉFINITION DU SCHÉMA BOOKS
const BookSchema = mongoose.Schema({
    userId: { type: String, required: true }, 
    title: { type: String, required: true }, 
    author: { type: String, required: true }, 
    imageUrl: { type: String, required: true }, 
    year: { type: Number, required: true }, 
    genre: { type: String, required: true },
    ratings: [
        {
            userId: { type: String, required: true }, 
            grade: { type: Number, required: true } 
        }
    ],
    averageRating: { type: Number,  default: 0 }
});

// 3--CALCUL DE LA MOYENNE 
BookSchema.methods.calculateAverageRating = function () {
    const numberOfRatings = this.ratings.length;
    if (numberOfRatings === 0) {
      this.averageRating = 0;
    } else {
      const totalNumbers = this.ratings.reduce((accumulator, rating) => accumulator + rating.grade, 0);
      this.averageRating = Math.round(totalNumbers / numberOfRatings);
    }
  };

// 4--EXPORTATION DU MODÈLE DE LIVRE BASÉ SUR LE SCHÉMA BOOK
module.exports = mongoose.model('Book', BookSchema);
