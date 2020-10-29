const connection = require('../../infra/connection');

module.exports = {
  
  /** Adicionar usuário */
  add: (user) => {
    const sql = `
      INSERT INTO users SET ?
    `;
    return new Promise((resolve, reject) => {
      connection.query(sql, user, (err, result) => {
          if(err) {
            return reject(err, ' Erro ao tentar adicionar usuario.');
          }
          return resolve(result);
      });
    });
  },

  /** Listar usuários */
  list: () => {
    const sql = `
      SELECT * FROM users ORDER BY nome
    `;
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
        if(err) {
          return reject(err, ' Erro ao tentar buscar usuarios.');
        }
        return resolve(result);
      });
    });
  },

  /** Buscar usuário */
  searchById: (id) => {
    const sql = `
      SELECT * FROM users WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      connection.query(sql, id, (err, result) => {
        if(err) {
          return reject(err, ' Erro ao tentar buscar usuario.');
        }
        return resolve(result);
      });
    });
  },

  /** Remover usuário */
  delete: (id) => {
    const sql = `
      DELETE FROM users WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      connection.query(sql, id, (err, result) => {
        if(err) {
          return reject(err, ' Erro ao tentar deletar usuario.');
        }
        return resolve(result);
      });
    });
  },

  /** Atualiza um usuário */
  update: (id, values) => {
    const sql = `
      UPDATE users SET ? WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      connection.query(sql, [values, id], (err, result) => {
        if(err) {
          return reject(err, ' Erro ao tentar atualizar usuario.');
        }
        return resolve(result);
      });
    });
  },

  /** Filtra usuario por nome */
  filterName: (name) => { // será passado uma query no parametro da url
    const sql = `
      SELECT * FROM users WHERE nome = ?
    `;
    return new Promise((resolve, reject) => {
      connection.query(sql, name, (err, result) => {
        if(err) {
          return reject(err, ' Erro ao tentar filtrar usuario.');
        }
        return resolve(result);
      });
    });
  }

}
