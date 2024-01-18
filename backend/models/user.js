// 1--Importation des modules nécessaires
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// 2--Définition du schéma de données pour l'utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Champ email, obligatoire et unique
    password: { type: String, required: true } // Champ password, obligatoire
});

// 3--Utilisation du plugin mongoose-unique-validator pour gérer l'unicité de l'email
userSchema.plugin(uniqueValidator);

// 4--Exportation du modèle User basé sur le schéma défini
module.exports = mongoose.model('User', userSchema);
