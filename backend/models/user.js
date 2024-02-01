////////////////////////USER MODELS/////////////////////////////

// 1--IMPORTATION DES MODULES NECESSAIRES
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// 2--DEFINITION DU SCHEMA USER
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true } 
});

// 3--UTILISATION DU POUR GERER LA VALIDATION UNIQUE 
userSchema.plugin(uniqueValidator);

// 4--EXPORTATION DU MODELE UTILISATEUR BASE SUR LE SCHEMA USER
module.exports = mongoose.model('User', userSchema);
