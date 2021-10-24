var express = require('express');
var MD5 = require("md5");
var axios = require("axios");
const jwt = require("jsonwebtoken");
var router = express.Router();
var { getCookie } = require('../middlewares/auth');
var qs = require('qs');

//router.use(getCookie);
/* GET users listing. */
router.get('', async (req, res, next) => {
  var token;
  var formBody = req.body;
  formBody['password'] = MD5(formBody['password']).toString();
  formBody['http_api_version'] = '3.4.0';
  var data = qs.stringify(formBody);
  var config = {
    method: 'post',
    url: 'http://vigalab.ddns.net:800/EHCommon/ModularAdmin/UserAPI/login',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };

  var respuesta = await axios(config)
  .then(function (response) {
    console.log(response.headers);
    var separado = response.headers['set-cookie'][0].split(";");
    var cookieData = separado[0].split("=");
    console.log(cookieData[1]);
    token = jwt.sign({username: req.body.username, key: cookieData[0], value: cookieData[1]}, process.env.HASH_KEY,{expiresIn: "1h",});
    return response.data;
  });

  res.set('token', token);
  res.send(respuesta);
});

module.exports = router;
