//c'est le point d'entrer du serveur
/* import des packages */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//import des fichiers exterieurs
const config= require('./config/dev');
const rental = require('./models/rentalSchema');
const FakeDb = require('./fake-db');


/* const rentalRoutes = require('./routes/rentalRoutes');
const usersRoutes = require('./routes/usersRoutes'); */
// deux possibilités d'écritures
const rentalRoutes = require('./routes/rentalRoutes'),
       usersRoutes = require('./routes/usersRoutes');


//Mongoose URI - connect est une promise
mongoose.connect(config.DB_URI).then(()=>{
  const fakeDb = new FakeDb();
  fakeDb.seedDb();
});

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', usersRoutes);



// specification d'un endpoint
/* app.get('/rentals', function(req, res){
res.json({'success': true});
});
 */
const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
  console.log('I am running');
});
