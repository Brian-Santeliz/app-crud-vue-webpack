const mongoose = require('mongoose');
const { Schema } = mongoose;
const adminSchema = new Schema({
  usuario: {
    type: String,
    required: true,
  },
  clave: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('admin', adminSchema);
