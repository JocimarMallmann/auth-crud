class Tables {
  constructor() {
    this.connection = '';
  }

  initTables(connection) {
    this.connection = connection;
    this.createTables();
  }

  createTables() {
    let sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        dataCriacao DATETIME NOT NULL,
        nome VARCHAR(50) NOT NULL,
        email VARCHAR(80) NOT NULL,
        senhaHash VARCHAR(20) NOT NULL,
        dataNascimento DATETIME NOT NULL,
        PRIMARY KEY(id)
      );
    `;
    
    this.connection.query(sql, (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log('Tabela users disponivel');
      }
    });
  }
}
module.exports = new Tables;
