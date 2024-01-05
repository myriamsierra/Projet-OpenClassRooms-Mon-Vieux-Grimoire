//application express

//on importe express
const express = require('express');

//on creer notre application en appelant la methode express (ce qui permet de creer une application express)
const app = express();

//premier middleware, intercepte toute les requetes qui ont ont content type json, et nous donne acceé au corp de la requete 
app.use(express.json());

//premier middleware,(CORS) general (il n y a pas de route precise indiquer) le cors est une securité, nous on veut que tout le monde puisse acceder a notre api, on va rajouter des headers a notre reponse pour indiquer que l utilisateur va avoir le droit d acceder a notre api 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//intercepter les requetes post, renvoyer un statut 201, et un messagePlacer la route POST au-dessus interceptera les requêtes POST, en les empêchant d'atteindre le middleware GET.
app.post('/api/books', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé'
    });
});

//middleware intercepter les requetes get et donner en reponse un tableau
app.get('/api/books', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);
  });

//on va exporter cette application
module.exports = app;