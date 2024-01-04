//application express

//on importe express
const express = require('express');

//on creer notre application en appelant la methode express (ce qui permet de creer une application express)
const app = express();

//premier middleware (test)
app.use((req, res, next) => {
    console.log('premier middleware');
    //on renvoie au prochain middleware
    next();
  });

//deuxieme middleware pour modifier le statut de notre requete (Le statut HTTP 201 est une réponse de réussite qui indique que la requête a été traitée avec succès et qu'une nouvelle ressource a été créée en conséquence)
app.use((req, res, next) =>{
    res.status(201);
    //on renvoie au prochain middleware
    next()
});

//troisieme middleware,on va utiliser la methode use pour faire une fonction qui recoit la requete,la reponse et la fonction next(qui renverra a la prochaine fonction), peut importe le type de requete
app.use((req, res, next)=> {
    //on retourne une reponse en format json
    res.json({message:'votre requete à été recue'});
    //on renvoie au prochain middleware
    next();
});

//dernier middleware
app.use((req,res) => {
    console.log('dernier middleware');
});

//on va exporter cette application
module.exports = app;