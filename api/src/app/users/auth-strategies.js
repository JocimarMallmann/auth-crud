const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./users-model');
const { ValidationError } = require('../errors');

/** aqui está configurado todas as estratégias de autenticação */

function verifyUser(user) {
  if(!user) {
    throw new ValidationError('E-mail não existente na base de dados.');
  }
}
async function verifyPassword(password, senhaHash) {
  const validPassword = await bcrypt.compare(password, senhaHash);
  if(!validPassword) {
    throw new ValidationError('E-mail e/ou senha inválidos.');
  }
}

// Configurando nova estratégia
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password', /**  */
      session: false /** Não estamos usando sessões */
    }, async (email, password, done) => {
      try {
        /**
         * Observação de estudo: Quando é model ou DAO, não colocamos try{}catch(){}, mas quando buscamos num controller ou em algum outro lugar como neste arquivo, colocamos um try{}catch(){} p/ tratar caso a busca falhe.
         */
        const user = await User.searchByEmail(email);
        verifyUser(user);
        await verifyPassword(password, user.senhaHash);
        // Passou nas verificações, devolvemos o user, para a função done()
        done(null, user);

      } catch(err) {
        done(err);
      }
      // done - a função callback do passport authenticate
    }
  )
)
