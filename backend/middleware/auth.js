const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       console.log('Received Token:', token);
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error : 'problem middleware auth'});
   }
};

// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//    try {
//        const token = req.headers.authorization.split(' ')[1];
//        console.log('Token:', token);  // Ajoutez ce log pour voir le token
       
//        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//        console.log('Decoded Token:', decodedToken);  // Ajoutez ce log pour voir le token décodé

//        const userId = decodedToken.userId;
//        req.auth = {
//            userId: userId
//        };
//        next();
//    } catch(error) {
//        console.error('Auth Error:', error);  // Ajoutez ce log pour voir l'erreur
//        res.status(401).json({ error : 'problem middleware auth'});
//    }
// };