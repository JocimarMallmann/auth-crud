const redis = require('redis');
const client = redis.createClient({ prefix: 'blacklist:' });

module.exports = client;
