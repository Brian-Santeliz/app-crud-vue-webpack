const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const { validarApi } = require('./middleware/autenticacion');
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/usuarios', validarApi, require('./router/usuarios.router'));
app.use('/api/login', require('./router/admin.router'));

const start = async () => {
  app.listen(app.get('port'));
  console.log(`Servidor en el puerto ${app.get('port')}`);
  try {
    await mongoose.connect('mongodb://localhost/usuarios', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.log('Error al conectar a MongoDB', error);
  }
};
start();
