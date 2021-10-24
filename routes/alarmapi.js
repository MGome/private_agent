var axios = require("axios");
var express = require('express');
const jwt = require("jsonwebtoken");
var router = express.Router();
var { getCookie } = require('../middlewares/auth');
var qs = require('qs');

router.use(getCookie);
/* GET users listing. */
router.post('/getall', async (req, res, next) => {
  var token;
  var formBody = req.body;
  var data = qs.stringify(formBody);
  var config = {
    method: 'post',
    url: 'http://vigalab.ddns.net:800//EHCommon/ModularAlarm/AlarmAPI/getAllCount',
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded',
      "Cookie": res.locals.cookie_name + "=" + res.locals.cookie_value
    },
    data : data
  };

  var respuesta = await axios(config)
  .then(function (response) {
    return response.data;
  });
  res.send(respuesta);
});

module.exports = router;