/* import des packages */
const express = require('express');

const app = express();
// specification d'un endpoint
app.get('/rentals', function(req, res){
res.json({'success': true});
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
  console.log('I am running');
});

/*
app.listen(3001, function(){
  console.log('I am running');

})
 */
