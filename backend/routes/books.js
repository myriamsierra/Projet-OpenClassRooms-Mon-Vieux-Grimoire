// 1--Importation des modules nécessaires
const express = require('express');
const auth = require('./../middleware/auth');
const multer = require('../middleware/multer-config');
const booksCtrl = require('./../controllers/books');

// 2--Création d'un routeur Express
const router = express.Router();

// 3--Définition des différentes routes pour les livres avec les contrôleurs correspondants
router.get('/', booksCtrl.getAllBook);// Obtenir tous les livres
router.post('/', auth, multer, booksCtrl.createBook);// Créer un nouveau livre (requiert l'authentification + gestion des fichiers avec multer)
router.get('/:id', booksCtrl.getOneBook);// Obtenir les détails d'un livre par son identifiant
router.put('/:id', auth, multer, booksCtrl.modifyBook);// Modifier un livre par son identifiant (requiert l'authentification + gestion des fichiers avec multer)
router.delete('/:id', auth, booksCtrl.deleteBook);// Supprimer un livre par son identifiant (requiert l'authentification)

// 4--Exportation du routeur
module.exports = router;


