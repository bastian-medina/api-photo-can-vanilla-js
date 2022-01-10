var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', {response: "mensaje de prueba"});
});


//dirige a randomPhoto
router.get('/randomPhoto', function(req, res, next) {

  var mascotas = fetch("https://dog.ceo/api/breeds/image/random");

  mascotas.then((respuesta)=>{
    return respuesta.json();
  })
  .then((respuestaConsole)=>{

    var myArray = respuestaConsole;
    console.log(myArray);
    res.render('randomPhoto', { response: myArray });


  });



});




//dirige a razaList y carga los nombres y fotos de la imagen
router.get('/razaList', function(req, res, next) {


    
  var mascotas = fetch("https://dog.ceo/api/breeds/list/all");

  mascotas.then((respuesta)=>{
    return respuesta.json();
  })
  .then((respuestaConsole)=>{

    



    var myArray = Object.entries(respuestaConsole.message);
    console.log(myArray);
    res.render('razaList', { response: myArray });


  });


});



//me dirige a subrazaList y carga los nombres e imagenes
router.get('/subRazaList', function(req, res, next) {

    
  var mascotas = fetch("https://dog.ceo/api/breeds/list/all");

  mascotas.then((respuesta)=>{
    return respuesta.json();
  })
  .then((respuestaConsole)=>{

    



    var myArray = Object.entries(respuestaConsole.message);
    res.render('subRazaList', { response: myArray });


  });


});


router.get('/photo/:id', function(req, res) {

  var dog = req.params.id;

  var mascotas = fetch("https://dog.ceo/api/breed/"+ dog +"/images/random");

  mascotas.then((respuesta)=>{
    return respuesta.json();
  })
  .then((respuestaConsole)=>{

    var myArray = respuestaConsole;
    console.log(myArray);
    res.render('photo', { response: myArray, dog: dog });


  });





});

router.get('/filterDog/:id', function(req, res) {

  var dog = req.params.id;

  var mascotas = fetch("https://dog.ceo/api/breed/"+ dog +"/list");

  mascotas.then((respuesta)=>{
    return respuesta.json();
  })
  .then((respuestaConsole)=>{

    var myArray = respuestaConsole.message;
    console.log(myArray);
    res.render('filterDog', { response: myArray, dog: dog });


  });





});


module.exports = router;
