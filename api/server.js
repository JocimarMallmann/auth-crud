/** um módulo que carrega variáveis ​​de ambiente, process.env */
require('dotenv').config();

const app = require('./src/config/app');
const connection = require('./src/infra/connection');
const Tables = require('./src/infra/tables');

require('./redis/blacklist');

const port = 3000;

connection.connect((err) => {
  if(err) {
    console.error('error connecting: ', err.stack);
    console.log(err.message);
    return;
  }
  Tables.initTables(connection);
  console.log('connected as id ' + connection.threadId);

  const routes = require('./src/app/routes/routes');
  routes(app);

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});
