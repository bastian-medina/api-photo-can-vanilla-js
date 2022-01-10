var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', {response: "mensaje de prueba"});
});






//dirige a randomPhoto cargando con la imagen inicial
router.get('/randomPhoto', function(req, res, next) {

  var mascotas = fetch("https://dog.ceo/api/breeds/image/random");

  mascotas.then((respuesta)=>{
    return respuesta.json();
  })
  .then((respuestaConsole)=>{

    //retorno la lista
    var myArray = respuestaConsole;
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
    var myArrayLength = myArray.length; //conteno de razas
    var myArraySubLenght = 0;// conteo de subrazas

    //for que me recorre y cuenta las subrazas
    for (var i = 0; i < myArray.length; i++) {
      myArraySubLenght = Number(myArraySubLenght) + Number(myArray[i][1].length);
   }


    //retorno la lista  
    console.log(myArraySubLenght);
    res.render('razaList', { response: myArray,  myArrayLength: myArrayLength, myArraySubLenght: myArraySubLenght});


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
    var myArrayLength = myArray.length;//conteo de razas
    var myArraySubLenght = 0;//conteo de subrazas

    //for que me recorre y cuenta las subrazas
    for (var i = 0; i < myArray.length; i++) {
      myArraySubLenght = Number(myArraySubLenght) + Number(myArray[i][1].length);
   }

    //retorno la lista
    res.render('subRazaList', { response: myArray,  myArrayLength:myArrayLength, myArraySubLenght:myArraySubLenght});


  });


});


//direccion de la foto seleccionada
router.get('/photo/:id', function(req, res) {

  //rescato la variable del url
  var dog = req.params.id;

  var mascotas = fetch("https://dog.ceo/api/breed/"+ dog +"/images/random");

  mascotas.then((respuesta)=>{
    return respuesta.json();
  })
  .then((respuestaConsole)=>{

    //retorno la lista
    var myArray = respuestaConsole;
    res.render('photo', { response: myArray, dog: dog });


  });

});




//direcion del filtro seleccionado
router.get('/filterDog/:id', function(req, res) {

  //rescato la variable del url
  var dog = req.params.id;

  var mascotas = fetch("https://dog.ceo/api/breed/"+ dog +"/list");

  mascotas.then((respuesta)=>{
    return respuesta.json();
  })
  .then((respuestaConsole)=>{

    var myArray = respuestaConsole.message;
    var myArrayLength = 1;//conteo razas por defecto
    var myArraySubLenght = 0;//conteo subrazas

    /*
      si está vacia, solo contará con 1 raza
      pero si no está vacio, recorrerá la lista para contarlos
    */
    if(myArray.length == 0){
      
      myArraySubLenght = 1;

    }else{

      myArraySubLenght = myArray.length;

    }


    //retorno la lista
    res.render('filterDog', { response: myArray, dog: dog, myArrayLength: myArrayLength, myArraySubLenght: myArraySubLenght });


  });





});


module.exports = router;
