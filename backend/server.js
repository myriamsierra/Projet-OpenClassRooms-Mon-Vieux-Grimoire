//ici le code pour notre server node
// on va creer un programme qui va ecouter des requetes http et qui va y répondre//

//1-importer le package http de node 
 const http = require('http');
 //2-on va creer un serveur, on appelle la methode 'createserver' de node pour le creer
 //elle recois deux arguments la requete et la réponse
 const server = http.createServer((req,res) => {
    res.end('voilà la réponse du serveur !! ');
 }); 
 //on va ecouter la requete envoyer avec la methode 'listen' de node
 //ici on va ecouter l'environement, sinon par default on va utiliser le port 3000
 server.listen(process.env.PORT || 3000)