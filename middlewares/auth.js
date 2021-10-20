const jwt = require("jsonwebtoken");

/* guarda la cookie en ctx.state.cookie, si no esta la cookie en la solicitud tira error 401 no autorizado*/
function getCookie(req, res, next) {
  res.locals.error = true;
  if (!req.headers.token) res.status(400).send({ error: 'Token no existe' });
  var decoded;
  try {
    decoded = jwt.verify(req.headers["token"], process.env.HASH_KEY);
  } catch (err) {
    res.status(405).send({ error: 'Error en token' });
  }

  if (!decoded.username || !decoded.key || !decoded.value || !decoded.exp || !decoded.iat){
      res.status(401).send({ error: 'Error en parametos del token' });
  } 
  else {
    if (decoded.exp <= Date.now() / 1000){
      res.status(402).send({ error: 'Token expiro' })
    //   console.log(decoded.exp);
    //   console.log(Date.now());
    }
    else{ 
      res.locals.cookie_value = decoded.value;
      res.locals.cookie_name = decoded.key;
      res.locals.error=false;
    }
  }
  return next();
}

module.exports = {
  getCookie
};



