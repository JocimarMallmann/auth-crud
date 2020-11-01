const clientBlacklist = require('./blacklist');
const { promisify } = require('util');

const existsAsync = promisify(clientBlacklist.exists).bind(clientBlacklist);
const setAsync = promisify(clientBlacklist.set).bind(clientBlacklist);

const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');

function generateTokenHash(token) {
  // link para eu estudar depois - https://nodejs.org/en/knowledge/cryptography/how-to-use-crypto-module/
  return createHash('sha256')
    .update(token).digest('hex');
  /**
   * O token gerado, é proporcional ao seu payload, então para padronizar e ter um tamanho exato essa função cria um hash dele para guardar.
   */
}

module.exports = {
  
  add: async (token) => {
    /**@method decode devolve o payload do token somente */
    const expirationDate = jwt.decode(token).exp; // retorna timestamp da expiração, https://tools.ietf.org/html/rfc7519#section-4.1.4
    const tokenHash = generateTokenHash(token);

    await setAsync(tokenHash, "");
    
    console.log('dataaaaa ', expirationDate);
    // adicionando o mesmo tempo de expiração do valor guardado no Redis que o token tem
    clientBlacklist.expireat(tokenHash, expirationDate);
  },

  hasToken: async (token) => {
    const tokenHash = generateTokenHash(token);

    /**@method existsAsync  Retorna 1 se tiver o token, e 0 se não tiver */
    const result = await existsAsync(tokenHash);
    return result === 1;
  }

};
