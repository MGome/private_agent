const jwt = require("jsonwebtoken");

/* guarda la cookie en ctx.state.cookie, si no esta la cookie en la solicitud tira error 401 no autorizado*/
function getCookie(req, res, next) {
  
  if (!req.headers.token) return res.status(400).send({ error: 'Token no existe' });

  var decoded;
  try {
    decoded = jwt.verify(req.headers["token"], process.env.HASH_KEY);
  } catch (err) {
    return res.status(405).send({ error: 'Error en token' });
  }

  if (!decoded.username || !decoded.key || !decoded.value || !decoded.exp || !decoded.iat){
      return res.status(401).send({ error: 'Error en parametos del token' });
  } 
  else {
    if (decoded.exp <= Date.now() / 1000){
      return res.status(402).send({ error: 'Token expiro' })

    }
    else{ 
      res.locals.cookie_value = decoded.value;
      res.locals.cookie_name = decoded.key;
    }
  }
  return next();
}

module.exports = {
  getCookie
};



