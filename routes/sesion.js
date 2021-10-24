// import URLSearchParams from 'url-search-params';

var router = new require("express").Router();
var axios = require("axios");

var MD5 = require("md5");
require('dotenv').config()


/* ENDPOINT 5.8.8 DOC */
router.post('/login', async (ctx) => {

  var formBody = ctx.request.body;

  formBody['password'] = MD5(formBody['password']).toString();
  formBody['http_api_version'] = '3.4.0';

  var formBody = new URLSearchParams(formBody).toString();
  var r_headers;
  var response = await fetch(
    `${process.env.URL_API}/EHCommon/ModularAdmin/UserAPI/login`,
    {
      method: 'POST',
      credentials: 'include',
      headers:
        { 'Content-Type': 'application/x-www-form-urlencoded' },
      'body': formBody
    }).then(function (response) {
      r_headers = response.headers.raw()['set-cookie'];
      return response.json()
    }).catch(r => console.log(r));

  var separado = r_headers[0].split(";");
  var cookieData = separado[0].split("=");
  ctx.cookies.set(cookieData[0], cookieData[1], {signed: false, sameSite: "none" });
  ctx.status = 201
  ctx.body = response
});

router.get('/userList', async (ctx) => {
  var myHeaders = new fetch.Headers();
  console.log("El header", ctx.header["cookie"]);
  myHeaders.append("Cookie", ctx.header["cookie"]);
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  var requestOptions = {
    headers: myHeaders
  };
  var response = await fetch(`${process.env.URL_API}/EHCommon/ModularAdmin/UserApi/getUser`, requestOptions)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .catch(error => console.log('error', error));

  ctx.body = response;
  ctx.status = 200;
});

router.post('/addUser', async (ctx) => {
  /* body and headers of the request */
  var formBody = ctx.request.body;   // BODY
  var formBody = new URLSearchParams(formBody).toString();

  var myHeaders = new fetch.Headers(); // HEADERS
  myHeaders.append("Cookie", ctx.header["cookie"]);
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  /* request */
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formBody
  };
  var response = await fetch(`${process.env.URL_API}/EHCommon/ModularAdmin/UserApi/changePassword`, requestOptions)
    .then(function (response) {
      return response.json()
    })
    .catch(error => console.log('error', error));

  /* response*/
  ctx.status = 201
  ctx.body = response
});

router.post('/updateUser', async (ctx) => {
  /* body and headers of the request */
  var formBody = ctx.request.body;   // BODY
  var formBody = new URLSearchParams(formBody).toString();

  var myHeaders = new fetch.Headers(); // HEADERS
  myHeaders.append("Cookie", ctx.header["cookie"]);
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  /* request */
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formBody
  };
  var response = await fetch(`${process.env.URL_API}/EHCommon/ModularAdmin/UserApi/changePassword`, requestOptions)
    .then(function (response) {
      return response.json()
    })
    .catch(error => console.log('error', error));

  /* response*/
  ctx.status = 201
  ctx.body = response
});


module.exports = router;