//--->CONFIGURATION DES ROUTES D'AUTH

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//-->route pour register
router.post('/signup', userCtrl.signup);
//-->route pour login
router.post('/login', userCtrl.login);

module.exports = router;