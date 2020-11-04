const usersController = require('./users-controller');
const authMiddlewares = require('./auth-middlewares');


module.exports = (app) => {
  app
    .route('/login')
    .post(
      authMiddlewares.local,
      usersController.login
    );
  
  app
    .route('/logout')
    .get(
      authMiddlewares.bearer,
      usersController.logout
    );

  app
    .route('/user')
    .post(
      authMiddlewares.bearer,
      usersController.add
    );
    
  app
    .route('/users')
    .get(
      authMiddlewares.bearer,
      usersController.list
    );

  app
    .route('/user/:id') /** a req, cria esse id pra mim */
    .delete(
      authMiddlewares.bearer,
      usersController.delete
    )
    .patch(
      authMiddlewares.bearer,
      usersController.update
    )
    .get(
      authMiddlewares.bearer,
      usersController.searchById
    );

  app
    .route('/user/filter/:userName')
    .get(
      authMiddlewares.bearer,
      usersController.filterName
    );
  
}
