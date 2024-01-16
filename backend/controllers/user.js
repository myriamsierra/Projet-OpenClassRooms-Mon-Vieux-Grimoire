// Importation des modules nécessaires
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');

// Fonction de création d'un nouvel utilisateur (signup)
exports.signup = (req, res, next) => {
    // Hashage du mot de passe fourni par l'utilisateur
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Création d'un nouvel utilisateur avec l'email et le mot de passe hashé
            const user = new User({
                email: req.body.email,
                password: hash
            });
            
            // Enregistrement de l'utilisateur dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error: 'Problème lors de la création de l\'utilisateur' }));
        })
        .catch(error => res.status(500).json({ error: 'Problème dans le signup' }));
};

// Fonction de connexion de l'utilisateur (login)
exports.login = (req, res, next) => {
    // Recherche de l'utilisateur dans la base de données par son email
    User.findOne({ email: req.body.email })
        .then(user => {
            // Vérification de l'existence de l'utilisateur
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            // Comparaison du mot de passe fourni avec le mot de passe hashé enregistré
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // Vérification de la validité du mot de passe
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }

                    // Génération d'un token JWT en cas de succès de l'authentification
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error: 'Problème dans la comparaison des mots de passe' }));
        })
        .catch(error => res.status(500).json({ error: 'Problème dans le login' }));
};
