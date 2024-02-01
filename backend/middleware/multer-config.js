//////////////MIDDLEWARE POUR LA GESTIONS DES IMAGES/////////////

// 1--IMPORTATION DES MODULES NECESSAIRES
const multer = require('multer');
const SharpMulter = require("sharp-multer");

// 2--DÉFINITION DES TYPES MIME POUR LES IMAGES ACCEPTÉES
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// 3--CONFIGURATION DU STOCKAGE DES FICHIERS AVEC SHARP-MULTER
const storage = SharpMulter({
  destination: (req, file, callback) => callback(null, "images"), 
  imageOptions: {
    fileFormat: "webp", 
    quality: 80, 
    resize: { width: 463, height: 595 }, 
  }
});

// 4--DÉFINITION DU NOM DE FICHIER POUR LE STOCKAGE
const filename = (req, file, callback) => {
  const name = file.originalname.split(' ').join('_'); 
  const extension = MIME_TYPES[file.mimetype]; 
  callback(null, name + Date.now() + '.' + extension); // heurodatage
};

// 5--CONFIGURATION DE MULTER AVEC LE STOCKAGE ET LE NOM DE FICHIER DÉFINIS
module.exports = multer({ storage: storage, filename: filename }).single('image');
