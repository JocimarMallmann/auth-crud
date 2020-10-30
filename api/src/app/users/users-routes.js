const usersController = require('./users-controller');
const passport = require('passport');

module.exports = (app) => {
  app
    .route('/login')
    .post(
      passport.authenticate('local', {session: false}),
      usersController.login
    );

  app
    .route('/user')
    .post(usersController.add);
    
  app
    .route('/users')
    .get(usersController.list);

  app
    .route('/user/:id') /** a req, cria esse id pra mim */
    .delete(usersController.delete)
    .patch(usersController.update)
    .get(usersController.searchById);

  
}
