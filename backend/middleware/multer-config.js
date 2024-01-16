// Importation du module multer
const multer = require('multer');

// Définition des types MIME autorisés et de la configuration de stockage
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // Destination des fichiers téléchargés dans le dossier 'images'
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // Remplacement des espaces dans le nom du fichier
    const extension = MIME_TYPES[file.mimetype]; // Récupération de l'extension du fichier à partir du type MIME
    callback(null, name + Date.now() + '.' + extension); // Composition du nom du fichier avec timestamp pour l'unicité
  }
});

// Exportation du middleware multer configuré avec le stockage défini
module.exports = multer({ storage: storage }).single('image'); // Utilisation du middleware pour traiter les fichiers d'image
