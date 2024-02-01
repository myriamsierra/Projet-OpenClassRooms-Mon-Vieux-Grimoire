/////////////////BOOKS ROUTES (ENDPOINT)//////////////////////

// 1--IMPORTATION DES MODULES NECESSAIRES
const express = require('express');
const auth = require('./../middleware/auth');  
const multer = require('../middleware/multer-config');  
const booksControllers = require('./../controllers/books');  

// 2--CREATION D UN ROUTEUR EXPRESS
const router = express.Router();

// 3--DEFINITION DES ROUTES BOOKS
router.get('/bestrating', booksControllers.getBestRatedBooks);  
router.get('/', booksControllers.getAllBook);  
router.post('/', auth, multer, booksControllers.createBook);  
router.get('/:id', booksControllers.getOneBook);  
router.put('/:id', auth, multer, booksControllers.modifyBook);  
router.delete('/:id', auth, booksControllers.deleteBook);  
router.post('/:id/rating', auth, booksControllers.rateBook);  

// 4--EXPORTATION DU ROUTEUR POUR UNE UTILISATION EXTERNE
module.exports = router;
