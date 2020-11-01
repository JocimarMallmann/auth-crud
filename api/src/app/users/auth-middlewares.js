const passport = require('passport');

module.exports = {

  local: function(req, res, next) { 
    // function criada para encapsular o passport.authenticate() e dar acesso do req e res ao callback personalizado authenticate()
    passport.authenticate(
      'local',
      { session: false },
      (err, user, info) => { // callback personalizado

        if(err && err.name === 'ValidationError') {
          return res.status(403).json({ err: err.message });
        }
        if(err) {
          return res.status(500).json({ err: err.message });
        }
        if(!user) {
          return res.status(403).json();
        }

        req.user = user;
        return next();
      }
    )(req, res, next); // Obs: solução apresentada na documentação
  },

  bearer: function(req, res, next) {
    passport.authenticate(
      'bearer',
      { session: false },
      (err, user, info) => {

        if(err && err.name === 'JsonWebTokenError') {
          return res.status(403).json({ err: err.message });
        }
        if(err && err.name === 'TokenExpiredError') {
          return res.status(403).json({ err: err.message });
        }
        if(err) {
          return res.status(500).json({ err: err.message, expiredIn: err.expiredAt });
        }
        if(!user) {
          return res.status(401).json();
        }

        // criando atributos na requisição
        req.token = info.token;
        req.user = user;
        return next();
      }
    )(req, res, next);
  }

};
