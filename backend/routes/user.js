// Importation des modules nécessaires
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Définition des routes d'authentification
router.post('/signup', userCtrl.signup); // Route pour l'inscription
router.post('/login', userCtrl.login);  // Route pour la connexion

// Exportation du routeur
module.exports = router;
