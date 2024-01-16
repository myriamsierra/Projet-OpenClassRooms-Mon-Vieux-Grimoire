// Importation des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const path = require('path');

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://user2:HuhzRn2BUwwh3DnG@clustermonvieuxgrimoire.uda4x4z.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Création de l'application Express
const app = express();

// Middleware pour gérer les CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Définition des routes pour les livres et l'authentification
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);

// Middleware pour servir les images statiques depuis le dossier 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

// Exportation de l'application Express
module.exports = app;
