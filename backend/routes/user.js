// 1--Importation des modules nécessaires
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// 2--Définition des routes d'authentification
router.post('/signup', userCtrl.signup); // Route pour l'inscription
router.post('/login', userCtrl.login);  // Route pour la connexion

// 3--Exportation du routeur
module.exports = router;
