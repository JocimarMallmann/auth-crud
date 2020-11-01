const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./users-model');
const { ValidationError } = require('../errors');

const blacklist = require('../../../redis/handle-blacklist');

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

// verifica se o token está na blacklist de logouts
async function tokenIsOnBlacklist(token) {
  const tokenBlacklist = await blacklist.hasToken(token);
  
  if(tokenBlacklist) {
    throw new jwt.JsonWebTokenError('Token inválido por logout');
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
        done(err, false);
      }
      // done - a função callback do passport authenticate
    }
  )
);

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        await tokenIsOnBlacklist(token);

        /**@method verify() - metodo que verifica se o token é válido, se for, retorna o payload, se não, um erro */
        const payload = jwt.verify(token, process.env.SENHA_SECRETA);

        const user = await User.searchById(payload.user);
        done(null, user, { token: token });
      } catch(err) {
        done(err);
      }
    }
  )
);
