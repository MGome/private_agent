var router = new require("express").Router();
var axios = require("axios");

const url = 'https://jsonplaceholder.typicode.com/todos/1';

/* ENDPOINT 5.1.47 DOC */
/* Error en parametro de area*/ 
router.get('/getRadio', async (ctx) => {
  var users = await fetch(url).then(function(response){
    return response.json()
  });
  console.log(users);
  const user1 = {"result":[{
    "id": "1",
    "name": "test",
    " z_start ": "0",
    " z_end ": "10",
    " zoom _area ": "",
    " zoom _len ": "0",
    " subnet _id ": null,
    " is _show ": "1",
    " is _use ": "1",
    " floor _id ": "1",
    " line _style ": "",
    " area_style ":" rgba ( 52, 64, 158, 0.5)",
    "x": "6.02",
    "y": "8.84",
    "z": "0",
    " term _id ": "3",
    " term _type ": "0",
    "comment": ""
}]};

  ctx.body = user1;
});


/* ENDPOINT 5.1.48 DOC */
/* Error en parametro de area*/ 
router.get('/getCount', async (ctx) => {
    var users = await fetch(url).then(function(response){
      return response.json()
    });
    console.log(users);
    const user1 = {"result":"2"};
  
    ctx.body = user1;
});


/* ENDPOINT 5.1.49 DOC */
/* Error en parametro de area*/ 
router.get('/addRadio', async (ctx) => {
    var users = await fetch(url).then(function(response){
      return response.json()
    });
    console.log(users);
    const user1 = {"result": "Added successfully"};
  
    ctx.body = user1;
});


/* ENDPOINT 5.1.50 DOC */
/* Error en parametro de area*/ 
router.get('/updateRadio', async (ctx) => {
    var users = await fetch(url).then(function(response){
      return response.json()
    });
    console.log(users);
    const user1 = {"result": "Modified successfully"};
  
    ctx.body = user1;
});


/* ENDPOINT 5.1.51 DOC */
/* Error en parametro de area*/ 
router.get('/deleteRadio', async (ctx) => {
    var users = await fetch(url).then(function(response){
      return response.json()
    });
    console.log(users);
    const user1 = {"result": "Delete successfully"};
    ctx.body = user1;
});

module.exports = router;