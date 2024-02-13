///////////////////////////////CONTROLLERS USER//////////////////////////////////

// 1--IMPORTATION DES MODULES NECESSAIRES
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
require('dotenv').config();
const { check,validationResult } = require('express-validator');

// 2--CONTROLLERS SIGNUP
exports.signup = [
    check('email').isEmail().normalizeEmail(),
    check('password')
        .isLength({ min: 6 }) 
        .matches(/[0-9]/) 
        .matches(/[A-Z]/), 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        bcrypt.hash(req.body.password, 10)   //hashache du mdp
        .then(hash => { 
            const user = new User({   //création user avec email + mdp hashé
                email: req.body.email,
                password: hash
            });
            user.save()  
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    }
];

// 3--CONTROLLERS LOGIN
exports.login = (req, res, next) => {  
    User.findOne({ email: req.body.email })    // Recherche de l'utilisateur dans la base de données avec l'email
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Paire login/mot de passe incorrecte' }); 
            }
            bcrypt.compare(req.body.password, user.password)    // Vérification du mot de passe hashé
                .then(valid => {
                    if (!valid) { 
                        return res.status(401).json({ error: 'Paire login/mot de passe incorrecte' });
                    }
                    const token = jwt.sign(    // Création d'un token (signé avec une clé) avec l'ID de l'utilisateur
                        { userId: user._id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: '24h' }
                    );
                    res.status(200).json({ userId: user._id, token });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};



