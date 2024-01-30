const express = require('express');
const auth = require('./../middleware/auth');
const multer = require('../middleware/multer-config');
const booksCtrl = require('./../controllers/books');

const router = express.Router();

router.get('/', booksCtrl.getAllBook);
router.post('/', auth, multer, booksCtrl.createBook); 
router.get('/:id', booksCtrl.getOneBook);
router.put('/:id', auth, multer, booksCtrl.modifyBook); 
router.delete('/:id', auth, booksCtrl.deleteBook);
router.get('/bestrating', booksCtrl.getBestRatedBooks);

module.exports = router;
