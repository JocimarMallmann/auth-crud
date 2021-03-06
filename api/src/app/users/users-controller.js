const dateFormat = require('dateformat');
const User = require('./users-model');
const blacklist = require('../../../redis/handle-blacklist');

const jwt = require('jsonwebtoken');
// criando o token
function createTokenJWT(user) {
  const payload = {
    id: user.id,
    user: user.nome,
    email: user.email
  }

  /**@method sign() gera o token e assina baseado no payload e da senha secreta do servidor.*/
  const token = jwt.sign(payload, process.env.SENHA_SECRETA, { expiresIn: '60m' });
  /** a senha secreta foi gerada pelo comando:
   * node -e "console.log( require('crypto').randomBytes(256).toString('base64') )"
   * esse metodo gera bytes pseudo aleatórias de acordo com a quantidade escolhida
   * nesse caso vai gerar uma string com 256 caracteres codificado em 'base64'
   */

  return token;
}

function transformUser(user) {
  return {
    id: user.id,
    creationDate: user.dataCriacao,
    name: user.nome,
    email: user.email
  }
}

module.exports = {

  // Temos a certeza de que o usuário já está autenticado, devido a um midlleware na rota já ter feito a autenticação
  login: (req, res) => {
    const token = createTokenJWT(req.user); // req.user, é colocado no momento que o passport.authenticate é finalizado

    // adicionando token ao cabecalho da resposta
    res.set({'authorization': token});

    console.log('autenticado ', req.user);

    return res.status(204).send();
  },

  logout: async (req, res) => {
    try {
      const token = req.token;

      // adicionando token na blacklist
      await blacklist.add(token);
      res.status(204).send();
    } catch(err) {
      res.status(500).json({ err: err.message });
    }
  },

  add: async (req, res) => {
    const date = new Date();
    const dataCriacao = dateFormat(date, 'yyyy-mm-dd HH:MM:ss');
    const { nome, email, senhaHash } = req.body;
    
    console.log('req.body de add ', req.body);
    try {
      const user = new User({
        dataCriacao,
        nome,
        email
      });
      await user.addPassword(senhaHash);
      await user.add(user); /** posso fazer um redirect para alguma rota aqui, concatenando o then(), MAS posso fazer isso no front acho */

      res.status(201).json();
    } catch(err) {
      res.status(403).json({ err: err.message });
    }
  },

  list: async (req, res) => {
    try {
      let users = await User.list();
      users = users.map((user) => {
        return transformUser(user);
      });
      res.status(201).json(users);
    } catch(err) {
      res.status(403).json({ err: err.message });
    }
  },

  searchById: async (req, res) => {
    try {
      const user = await User.searchById(req.params.id);

      res.status(201).json(user);
    } catch(err) {

      res.status(403).json({ err: err.message });
    }
  },

  delete: async (req, res) => {
    try {

      await User.delete(req.params.id);
      res.status(201).json();
    } catch(err) {

      res.status(403).json({ err: err.message });
    }
  },

  update: async (req, res) => {
    try {
      console.log('req.body controller update ', req.body);
      const {nome, email} = req.body;
      const id = req.params.id;

      const user = await User.searchById(id);
      // const senhaHashHash = await user.addPassword(senhaHash);

      await User.update(
        user.id,
        {nome, email}
      );

      res.status(201).json();
    } catch(err) {
      res.status(403).json({ err: err.message, req: req.body });
    }
  },

  filterName: async (req, res) => {
    try {
      const { userName } = req.params;
    
      const user = await User.filterName(userName);
      let transformedUser = transformUser(user);

      res.status(201).json({ ...transformedUser })
    } catch(err) {
      res.status(403).json({ err: err.message });
    }
  }

};
