///////////////////////////////////////////////CREATION APPLICATION EXPRESS///////////////////////////////////////////////////

// 1--IMPORTATION DES MODULES NECESSAIRES
const express = require('express'); 
const mongoose = require('mongoose');  
const bodyParser = require('body-parser');  
const booksRoutes = require('./routes/books');  
const userRoutes = require('./routes/user');  
const path = require('path');  


// 2--CONNEXION BASE DE DONNEE MONGODB
mongoose.connect('mongodb+srv://user2:HuhzRn2BUwwh3DnG@clustermonvieuxgrimoire.uda4x4z.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


// 3--CREATION D UNE APPLICATION EXPRESS
const app = express();


// 4--MIDDLEWARE POUR GERER LES AUTORISATIONS CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
  next();  
});


// 5--MIDDLEWARE POUR PARSER LES CORPS DE REQUETES EN JSON
app.use(bodyParser.json());


// 6--UTILISATION DES ROUTES BOOKS ET AUTH
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);


// 7--MIDDLEWARE POUR SERVIR LES FICHIERS STATIQUES (IMAGES) DEPUIS LE DOSSIER IMAGES
app.use('/images', express.static(path.join(__dirname, 'images')));


// 8--EXPORTATION DE L APP POUR UTILISATION EXTERNE
module.exports = app;
