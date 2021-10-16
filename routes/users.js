var express = require('express');
var MD5 = require("md5");
var router = express.Router();


/* GET users listing. */
router.post('/', async (req, res, next) => {
  // res.send('respond with a resource');
  var formBody = req.body;
  
  formBody['password'] = MD5(formBody['password']).toString();
  formBody['http_api_version'] = '3.4.0';

  var formBody = new URLSearchParams(formBody).toString();
  var r_headers;
  var response = await fetch(
    `${process.env.URL_API}/EHCommon/ModularAdmin/UserAPI/login`, 
  {method: 'POST',
  credentials: 'include', 
  headers: 
  {'Content-Type': 'application/x-www-form-urlencoded'},
  'body': formBody }).then(function(response){
    r_headers = response.headers.raw()['set-cookie'];
    return response.json()
  }).catch(r => console.log(r));

  var separado = r_headers[0].split(";");
  var cookieData = separado[0].split("=");
  res.cookies.set(cookieData[0], cookieData[1], { secure: true, signed: false, sameSite: "none" });
  res.cookies.set(cookieData[0]+".sig");
  res.status = 201
  res.body = response
});

module.exports = router;
