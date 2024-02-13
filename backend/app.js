///////////////////////////////////////////////CREATION APPLICATION EXPRESS///////////////////////////////////////////////////

// 1--IMPORTATION DES MODULES NECESSAIRES

require('dotenv').config();// charger les variables d'environnement avt que l'app soit initiaisé
require('./secret-token');// Appel du fichier de chargement des variables d'environnement

const express = require('express'); 
const mongoose = require('mongoose');  
const bodyParser = require('body-parser');  
const booksRoutes = require('./routes/books');  
const userRoutes = require('./routes/user');  
const path = require('path');  
const rateLimit = require('express-rate-limit');

// 2--CONNEXION BASE DE DONNEE MONGODB
mongoose.connect(process.env.MONGODB_URL,{ 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
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

// 8--MIDDLEWARE POUR LIMITER LE NOMBRE DE REQUETE PAR MINUTES (brutforce et ddos)
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, 
	standardHeaders: true, 
	legacyHeaders: false, 
})

app.use(limiter)

// 9--EXPORTATION DE L APP POUR UTILISATION EXTERNE
module.exports = app;
