//////////////MIDDLEWARE POUR LA GESTIONS DES AUTHENTIFICATIONS/////////////

// 1--IMPORTATION DES MODULES NECESSAIRES
const jwt = require('jsonwebtoken');

// 2--MIDDLEWARE  POUR VÉRIFIER LES JETONS DANS LES REQUÊTES
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];    // extration du jeton dans le headers
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');   // décodage du jeton avec le clé secrete
        const userId = decodedToken.userId;   //extration de l'id a partir du jeton décodé
        req.auth = {userId: userId}    //ajout de l'id dans l objet auth
        next();
    } catch (error) {
        res.status(401).json({ error:"Echec lors de l'authentification" });
    }
};
