///////////////USER ROUTES (ENDPOINT)//////////////////////////

// 1--IMPORTATION DES MODULES NECESSAIRES
const express = require('express');
const userControllers = require('../controllers/user');

// 2--CREATION D'UN ROUTER EXPRESS
const router = express.Router();

// 3-- DEFINITIONS DES ROUTES POUR L INSCRIPTION ET LA CONNEXION 
router.post('/signup', userControllers.signup);  
router.post('/login', userControllers.login);    

// 4--EXPORTATION DU ROUTEUR POUR UNE UTILISATION EXTERNE
module.exports = router;

