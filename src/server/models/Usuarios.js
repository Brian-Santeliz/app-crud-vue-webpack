const mongoose = require('mongoose');
const { Schema } = mongoose;
const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
    validator: {
      validator: function(v) {
        return v >= 0 && v <= 120;
      },
    },
  },
  sexo: {
    type: String,
    required: true,
    enum: ['Masculino', 'Femenino'],
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('usuarios', usuarioSchema);
