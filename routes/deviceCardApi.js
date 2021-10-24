var router = new require("express").Router();
var axios = require("axios");


/* ENDPOINT 5.1.1 DOC */
router.post('/getPersonList', async (ctx) => {
  var myHeaders = new fetch.Headers();
  myHeaders.append("Cookie", ctx.header["cookie"]);
  myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
  var formBody = ctx.request.body;
  var formBody = new URLSearchParams(formBody).toString();

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
        body: formBody
  };


  var person = await fetch(`${process.env.URL_API}/EHCommon/ModularDevice/DeviceCardAPI/getPersonList`, requestOptions)
  .then(function(response){
    return response.json()
  })
  .catch(error => console.log('error', error));

  ctx.body = person;
});


/* ENDPOINT 5.1.2 DOC */
router.post('/getPersonListCount', async (ctx) => {

  var myHeaders = new fetch.Headers();
  myHeaders.append("Cookie", ctx.header["cookie"]);
  myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
  var formBody = ctx.request.body;
  var formBody = new URLSearchParams(formBody).toString();

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
        body: formBody
  };


  var person_count = await fetch(`${process.env.URL_API}/EHCommon/ModularDevice/DeviceCardAPI/getPersonListCount`, requestOptions)
  .then(function(response){
    return response.json()
  })
  .catch(error => console.log('error', error));

  ctx.body = person_count;
});


/* DISPLAY TAG */
router.post('/getCards', async (ctx) => {

  var myHeaders = new fetch.Headers();
  myHeaders.append("Cookie", ctx.header["cookie"]);
  myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
  var formBody = ctx.request.body;
  var formBody = new URLSearchParams(formBody).toString();

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
        body: formBody
  };

  var get_card = await fetch(`${process.env.URL_API}/EHCommon/ModularRealTime/RealTimeAPI/getNowInfo`, requestOptions)
  .then(function(response){
    return response.json()
  })
  .catch(error => console.log('error', error));

  get_card["result"]["data"].forEach(function(card) {
    var enLinea = card["online"];
    if (enLinea == 0) {
      card["online"] = "Offline no signal";
    } else if (enLinea == 1) {
      card["online"] = "Online";
    } else if (enLinea == 2) {
      card["online"] = "Offline signal";
    };

    card["url_call"] = `${process.env.URL_DEPLOY}/cards/callCardList`;

    
  });

  ctx.body = get_card;
});

router.post('/callCardList', async (ctx) => {

  var myHeaders = new fetch.Headers();
  myHeaders.append("Cookie", ctx.header["cookie"]);
  myHeaders.append('Content-Type' , 'application/x-www-form-urlencoded')
  var formBody = ctx.request.body;

  var requestBody = [];
  for (var property in formBody) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(formBody[property]);
    requestBody.push(encodedKey + "=" + encodedValue);
  }
  requestBody = requestBody.join("&");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
        body: requestBody
  };

  var get_card = await fetch(`${process.env.URL_API}/EHCommon/ModularRealTime/RealTimeAPI/callCardList`, requestOptions)
  .then(function(response){
    return response.json()
  })
  .catch(error => console.log('error', error));

  ctx.body = get_card;
});
/* TERMINADO DISPLAY TAG */


/* ENDPOINT 5.1.4 DOC */
router.get('/getCount', async (ctx) => {
  var users = await fetch(url).then(function(response){
    return response.json()
  });
  console.log(users);
  const respuesta = {"result":"3"};

  ctx.body = respuesta;
});

/* ENDPOINT 5.1.5 DOC */
router.get('/addCard', async (ctx) => {
  var users = await fetch(url).then(function(response){
    return response.json()
  });
  console.log(users);
  const respuesta = {"result":"Add card number: 999 , operation is successful "};
  ctx.body = respuesta;
});

/* ENDPOINT 5.1.6 DOC */
router.get('/delCard', async (ctx) => {
  var users = await fetch(url).then(function(response){
    return response.json()
  });
  console.log(users);
  const respuesta = {"result":"Delete card number: 999 , operation is successful "};
  ctx.body = respuesta;
});

/* ENDPOINT 5.1.7 DOC */
router.get('/updateCard', async (ctx) => {
  var users = await fetch(url).then(function(response){
    return response.json()
  });
  console.log(users);
  const respuesta = {"result": "Modify the card number information , the operation is successful "};
  ctx.body = respuesta;
});

/* ENDPOINT 5.1.8 DOC */
router.get('/importCard', async (ctx) => {
  var users = await fetch(url).then(function(response){
    return response.json()
  });
  console.log(users);
  const respuesta = {"result": " Import card number data, read 1 line in total "};
  ctx.body = respuesta;
});


module.exports = router;