const usersDao = require('./users-dao');
const { ValidationError } = require('../errors');
const validations = require('../common-validations');
const bcrypt = require('bcrypt');

class User {
  constructor(user) {
    this.id = user.id;
    this.dataCriacao = user.dataCriacao;
    this.nome = user.nome;
    this.email = user.email;
    this.senhaHash = user.senhaHash;
  }

  async add(user) {
    if(await User.searchByEmail(user.email)) {
      throw new ValidationError('E-mail já utilizado por outro usuário.');
    }

    this.validatesAttributes();
    return usersDao.add(user);
  }

  async addPassword(password) {
    validations.stringNotNull(password, 'senha');
    /** Salvando o hash da senha ao invés da senha */
    this.senhaHash = await User.generateHashPassword(password);

    // retornando senhaHash para usar no metodo update do controller
    return this.senhaHash;
  }

  /** static, pois retorna dados sem instância, e no controller não é instanciado também */
  static async list() {
    return usersDao.list();
  }
  
  static async searchById(id) {
    const user = await usersDao.searchById(id);
    /** precisei colocar 'await' por conta da validação abaixo */
    if(!user || !user.length) {
      return null;
    }
    
    return new User(user[0]);
  }

  static async searchByEmail(email) {
    const user = await usersDao.searchByEmail(email);
    if(!user || !user.length) {
      return null;
    }
    console.log('model searchByEmail ', user);
    return new User(user[0]);
  }
  
  static async delete(id) {
    return usersDao.delete(id);
  }

  static async update(id, values) {
    return usersDao.update(id, values);
  }

  async filterName(name) {
    const user = await usersDao.filterName(name);
    if(!user) {
      return null;
    }
    return new User(user);
  }

  validatesAttributes() {
    validations.stringNotNull(this.nome, 'nome');
    validations.stringNotNull(this.email, 'email');
  }

  static generateHashPassword(password) {
    /**@const saltRounds - define o quão demorado a função vai executar */
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

}

module.exports = User;
