const Admin = require('../models/Admin');

const verificarId = (id) => {
  return id.match(/^[0-9a-fA-F]{24}$/);
};
const validarApi = async (req, res, next) => {
  if (req.headers.autenticacion) {
    if (!verificarId(req.headers.autenticacion)) {
      return res.status(400).json({
        msg: 'El id de autenticacion no es valido',
      });
    }
    const resultado = await Admin.findById({
      _id: req.headers.autenticacion,
    });
    if (resultado) {
      next();
    } else {
      res.status(401).json({
        msg: 'Usuario no existente',
      });
    }
  } else {
    res.status(401).json({
      msg: 'No esta autorizado',
    });
  }
};
module.exports = {
  validarApi,
};
