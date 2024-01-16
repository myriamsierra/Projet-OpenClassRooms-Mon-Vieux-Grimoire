//---------------------------------------------------------SERVER NODE JS------------------------------------------------------------------------

//--1 On importe les modules necessaires
const http = require('http');// Importation du module http pour créer le serveur 
const app = require('./app');// Importation de notre application express

// --2 Fonction (normelizePort) qui ajuste et normalise le numéro de port
const normalizePort = (val) => {
  const port = parseInt(val, 10);  // Convertit le numéro de port en un entier base 10.

  if (isNaN(port)) { // Si ce n'est pas un nombre, retourne la valeur d'origine.
      return val;
  }
  if (port >= 0) { // Si le numéro de port est un nombre positif, retourne le numéro de port.
      return port;
  }
  return false;// Sinon, retourne false (indique qu'il n'est pas valide).
};

// --3 Récupération du port à partir des variables d'environnement ou utilisation du port 3000 par défaut
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// --4 Fonction(errorHandler) de gestion des erreurs liées au serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' nécessite des privilèges élevés.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' est déjà utilisé.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// --5 Création du serveur en utilisant le module http et l'application définie dans app
const server = http.createServer(app);

// --6 Gestion des événements d'erreur et de lancement du serveur
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Écoute sur ' + bind);
});

// --7 Lancement du serveur sur le port spécifié dans les variables d'environnement ou sur le port 3000 par défaut
server.listen(process.env.PORT || 3000);
