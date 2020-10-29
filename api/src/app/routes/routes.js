const users = require('../users');

module.exports = (app) => {
  app.get('', (req, res) => {
    res.send('Rota raiz');
  });

  users.routes(app);
}
