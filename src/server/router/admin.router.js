const { Router } = require('express');
const router = Router();
const Admin = require('../models/Admin');
const { compararClave } = require('../utils/clave');
router.post('/autenticarAdmin', async (req, res) => {
  const { usuario, clave } = req.body;
  const adminExistente = await Admin.findOne({ usuario });
  if (!adminExistente) {
    return res.status(400).json({ msg: 'El usuario no existe' });
  }
  const resultado = await compararClave(clave, adminExistente.clave);
  if (!resultado) {
    return res.status(400).json({ msg: 'La clave no es correcta' });
  }
  res.status(200).json({
    msg: 'Autenticación correcta',
    data: true,
    adminId: adminExistente._id,
  });
});

module.exports = router;
