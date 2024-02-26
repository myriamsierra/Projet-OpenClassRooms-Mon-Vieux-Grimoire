/////////////////////////////////////CREATION DU SERVEUR//////////////////////////////////////////////

const http = require('http');
const app = require('./app');

// 1--FONCTION POUR NORMALISER LE PORT
const normalizePort = (val) => {
    const port = parseInt(val, 10);  
        if (isNaN(port)) {
            return val;
        }
        if (port >= 0) {
            return port;
        }
    return false;
};

// 2-- RECUPERER LA VAR ENVIRONEMENT POUR NOTRE APP
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

// 3--CALLBACK ERREURS PORTS
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
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

// 4--CREATION DU SERVEUR HTTP AVC EXPRESS
const server = http.createServer(app);

// 5--EVENT HANDLER
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Écoute sur ' + bind);
});

// 6--DEMARRER LE SERV EN ECOUTANT LE PORT SPECIFIE
server.listen(port);
