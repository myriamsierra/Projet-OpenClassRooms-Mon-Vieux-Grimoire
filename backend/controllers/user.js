///////////////////////////////CONTROLLERS USER//////////////////////////////////

// 1--IMPORTATION DES MODULES NECESSAIRES
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');

// 2--CONTROLLERS SIGNUP
exports.signup = (req, res, next) => {
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
};

// 3--CONTROLLERS LOGIN
exports.login = (req, res, next) => {  
    User.findOne({ email: req.body.email })    //recherche de l'user dans la db avc le mail
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Paire login/mot de passe incorrecte' }); 
            }
            bcrypt.compare(req.body.password, user.password)    //verification du mdp hashé
                .then(valid => {
                    if (!valid) { 
                        return res.status(401).json({ error: 'Paire login/mot de passe incorrecte' });
                    }
                    //creation d'un token (signé avec une clé) avec l'id user
                    res.status(200).json({      
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};



