const { compare } = require('bcrypt');
const compararClave = async (clave, claveEncontrada) => {
  return await compare(clave, claveEncontrada);
};
module.exports = {
  compararClave,
};
