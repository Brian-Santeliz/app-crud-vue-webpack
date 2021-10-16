const { Router } = require('express');
const router = Router();
const Usuarios = require('../models/Usuarios');

router.get('/', async (req, res) => {
  const usuariosRegistrados = await Usuarios.find();
  res.json(usuariosRegistrados);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuarios.findById({ _id: id });
  if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });
  res.status(200).json(usuario);
});

router.post('/', async (req, res) => {
  const { nombre, apellido, edad, sexo, fechaNacimiento, email } = req.body;
  if (!nombre || !apellido || !edad || !sexo || !fechaNacimiento || !email) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }
  const usuario = new Usuarios({
    nombre,
    apellido,
    edad,
    sexo,
    fechaNacimiento,
    email,
  });
  await usuario.save();
  res.status(200).json({ msg: 'Usuario registrado' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const eliminado = await Usuarios.findByIdAndDelete({ _id: id });
  if (eliminado) {
    res.status(200).json({ msg: 'Eliminado' });
  } else {
    res.status(404).json({ msg: 'Este usuario no existe' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, edad, sexo, fechaNacimiento, email } = req.body;
  if (!nombre || !apellido || !edad || !sexo || !fechaNacimiento || !email) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }
  const actualizado = await Usuarios.findByIdAndUpdate(
    { _id: id },
    { ...req.body }
  );
  return actualizado
    ? res.status(200).json({ msg: 'Usuario actualizado' })
    : res.status(404).json({ msg: 'Usuario no actualizado' });
});
module.exports = router;
