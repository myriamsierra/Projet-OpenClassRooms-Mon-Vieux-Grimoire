//--------------------------------------------------------APPLICATION EXPRESS-------------------------------------------------------------------------------

// 1--Importation des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const path = require('path');

// 2--Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://user2:HuhzRn2BUwwh3DnG@clustermonvieuxgrimoire.uda4x4z.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// 3--Création de l'application Express
const app = express();

// 4--Middleware pour gérer les CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Autorise l'accès à l'API depuis n'importe quelle origine (*).
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Autorise certains en-têtes HTTP pendant la requête.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Autorise certaines méthodes HTTP pendant la requête.
  next();  // Passe à la prochaine fonction middleware dans la chaîne de traitement.
});

// 5--Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// 6--Définition des routes pour les livres et l'authentification
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);

// 7--Middleware pour servir les images statiques depuis le dossier 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

// 8--Exportation de l'application Express
module.exports = app;
