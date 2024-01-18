// 1--Importation du module jwt pour la gestion des tokens JWT
const jwt = require('jsonwebtoken');

// 2--Middleware pour l'authentification avec un token JWT
module.exports = (req, res, next) => {
    try {
        // Extraction du token du header Authorization
        const token = req.headers.authorization.split(' ')[1];
        console.log('Received Token:', token);

        // Vérification et décodage du token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        // Récupération de l'identifiant de l'utilisateur à partir du token décodé
        const userId = decodedToken.userId;

        // Ajout de l'information d'authentification à la requête
        req.auth = {
            userId: userId
        };

        // Poursuite du traitement vers la prochaine fonction middleware
        next();
    } catch(error) {
        // En cas d'erreur lors de la vérification du token, retour d'une réponse d'erreur non autorisée (401)
        res.status(401).json({ error: 'Problème avec le middleware d\'authentification' });
    }
};

