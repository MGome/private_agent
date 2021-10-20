var express = require('express');
var MD5 = require("md5");
var axios = require("axios");
const jwt = require("jsonwebtoken");
var router = express.Router();
var { getCookie } = require('../middlewares/auth');

router.use(getCookie);
/* GET users listing. */
router.get('', async (req, res, next) => {
  if (res.locals.error) {
    return;
  }
  var token;
  var respuesta = await axios.get("https://www.google.com/", {withCredentials: true})
  .then(function (response) {
    
    var separado = response.headers['set-cookie'][0].split(";");
    var cookieData = separado[0].split("=");
    console.log(cookieData[1]);
    token = jwt.sign({user: req.data.username, key: cookieData[0], value: cookieData[1]}, process.env.HASH_KEY,{expiresIn: "1h",});
    return response.data;
  });

  res.set('token', token);
  res.send(respuesta);
});

module.exports = router;
