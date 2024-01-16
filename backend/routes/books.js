//-->CONFIGURER LES ROUTES PRINCIPALES

// Importation des modules nécessaires
const express = require('express');
const auth = require('./../middleware/auth');
const multer = require('../middleware/multer-config');
const booksCtrl = require('./../controllers/books');

// Création d'un routeur Express
const router = express.Router();

// Définition des différentes routes pour les livres avec les contrôleurs correspondants
router.get('/', booksCtrl.getAllBook);
router.post('/', auth, multer, booksCtrl.createBook);
router.get('/:id', booksCtrl.getOneBook);
router.put('/:id', auth, multer, booksCtrl.modifyBook);
router.delete('/:id', auth, booksCtrl.deleteBook);

// Exportation du routeur
module.exports = router;
