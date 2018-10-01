// middleware for authentication
let jwt = require('jsonwebtoken');
let config = require('../config');

module.exports = async function authorize(req, res, next) {

  allowed = ['/login', '/register'];

  if (allowed.indexOf(req.path) === -1) {

    const apiToken = req.headers['x-access-token'];
    if (!apiToken)
      return res.status(401).send({message: 'Token Bulunamadi..'});

    jwt.verify(apiToken, config.apiKey, function (err, decodedUser) {
      if (err) {
        return res.status(401).send({ message: 'Token Dogrulamasi Basarisiz..' });
      } else {
        req.user = decodedUser;
        next();
      }
    });
    
  } else {

    next();
  }

}


