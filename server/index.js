//c'est le point d'entrer du serveur


/* import des packages */
const express = require('express');
const mongoose = require('mongoose');

//import des fichiers exterieurs
const config= require('./config/dev');
const rental = require('./models/schemaRental');
const FakeDb = require('./fake-db');

//Mongoose URI - connect est une promise
mongoose.connect(config.DB_URI).then(()=>{
  const fakeDb = new FakeDb();
  fakeDb.seedDb();
});

const app = express();
// specification d'un endpoint
app.get('/rentals', function(req, res){
res.json({'success': true});
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
  console.log('I am running');
});
