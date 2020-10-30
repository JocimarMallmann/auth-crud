const dateFormat = require('dateformat');
const User = require('./users-model');

module.exports = {

  login: async (req, res) => {
    // Temos a certeza de que o usuário já está autenticado, devido a um midlleware na rota já ter feito a autenticação
    return res.status(204).send();
  },

  add: async (req, res) => {
    const date = new Date();
    const dataCriacao = dateFormat(date, 'yyyy-mm-dd HH:MM:ss');
    const { nome, email, senhaHash } = req.body;
    
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
      const users = await User.list();
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
      const {nome, email, senhaHash} = req.body;
      const id = req.params.id;

      const user = await User.searchById(id);
      const senhaHashHash = await user.addPassword(senhaHash);

      await User.update(
        user.id,
        {nome, email, senhaHash: senhaHashHash}
      );

      res.status(201).json();
    } catch(err) {
      res.status(403).json({ err: err.message });
    }
  },

  // filterName: async (req, res) => {
  //   try {

  //   } catch(err) {
  //     res.status(403).json({ err: err.message });
  //   }
  // }

};
