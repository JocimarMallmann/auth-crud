const { ValidationError } = require('./errors');

module.exports = {

  stringNotNull: (value, field) => {
    if(typeof value != 'string' || !value) {
      throw new ValidationError(`É necessário preencher o campo ${field}`);
    }
  }
  // dateNotNull: () => { 
  // }

};
