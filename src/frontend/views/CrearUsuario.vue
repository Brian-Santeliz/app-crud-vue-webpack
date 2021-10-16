<template>
  <div>
    <h1 class="titulo-principal">Crear usuario</h1>
    <div class="container">
      <div class="container-form">
        <div class="form">
          <form @submit.prevent="crearUsuario">
            <fieldset>
              <legend>
                <span class="titulo">Completa</span> la información del usuario
              </legend>
              <legend>
                <small class="text-muted"
                  >Los campos <strong>*</strong> son requeridos</small
                >
                <br />
              </legend>
              <label class="text-muted" for="nombre">Nombre del usuario:</label>
              <input
                type="text"
                required
                name="nombre"
                id="nombre"
                placeholder="Nombre *"
                v-model.trim="usuario.nombre"
              />
              <label class="text-muted" for="apellido"
                >Apellido del usuario:</label
              >
              <input
                type="text"
                required
                name="apellido"
                id="apellido"
                placeholder="Apellido *"
                v-model.trim="usuario.apellido"
              />
              <label class="text-muted" for="edad">Indica la edad:</label>
              <input
                type="number"
                required
                min="5"
                max="100"
                name="edad"
                id="edad"
                placeholder="Edad *"
                v-model="usuario.edad"
              />
              <label class="text-muted" for="email">Email del usuario:</label>
              <input
                type="email"
                required
                name="email"
                id="email"
                placeholder="Email *"
                v-model.trim="usuario.email"
              />
              <label class="text-muted" for="sexo">Sexo:</label>
              <select id="sexo" name="sexo" required v-model="usuario.sexo">
                <option value="" disabled selected>Selecionar Sexo *</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
              <label for="fecha" class="text-muted">Fecha:</label>
              <input
                type="date"
                required
                name="fecha"
                id="fecha"
                placeholder="Fecha *"
                max="2016-01-31"
                v-model="usuario.fechaNacimiento"
              />
            </fieldset>
            <input type="submit" value="Registrar usuario" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import axios from "axios";
export default {
  name: "CrearUsuario",
  data() {
    return {
      usuario: {
        nombre: "",
        apellido: "",
        edad: "",
        email: "",
        sexo: "",
        fechaNacimiento: "",
      },
    };
  },
  methods: {
    crearUsuario() {
      if (
        !this.usuario.nombre ||
        !this.usuario.apellido ||
        !this.usuario.edad ||
        !this.usuario.email ||
        !this.usuario.sexo ||
        !this.usuario.fechaNacimiento
      ) {
        return swal("Todos los campos son requeridos", {
          icon: "error",
          title: "Error al registrar el usuario",
        });
      }
      if (this.validarFechaMenorActual(this.usuario.fecha)) {
        return swal(
          "La fecha de nacimiento no puede ser mayor a la fecha actual",
          {
            icon: "error",
          }
        );
      }
      axios
        .post("http://localhost:3000/api/usuarios", this.usuario, {
          headers: {
            autenticacion: `${localStorage.getItem("admin-login")}`,
          },
        })
        .then((response) => {
          swal(response.data.msg, {
            icon: "success",
            title: "¡Guardado correctamente!",
          });
          this.$router.push("/");
          return;
        })
        .catch((error) => {
          swal("Ocurrió un error creando el usuario", {
            icon: "error",
            title: "Error",
          });
          if (error.response.data.msg) {
            swal(`${error.response.data.msg}`, {
              icon: "error",
              title: "Error",
            });
            window.localStorage.removeItem("admin-login");
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          }
        });
      this.usuario = {
        nombre: "",
        apellido: "",
        edad: "",
        email: "",
        sexo: "",
        fechaNacimiento: "",
      };
    },
    validarFechaMenorActual(fecha) {
      let fechaActual;
      let fechaUsuario;
      let fechaMenor = false;
      fechaActual = new Date();
      fechaUsuario = new Date(fecha);
      if (fechaUsuario > fechaActual) {
        fechaMenor = true;
      }
      return fechaMenor;
    },
  },
};
</script>

<style lang="css">
.form {
  max-width: 500px;
  padding: 10px 20px;
  background: #f4f7f8;
  margin: 10px auto;
  padding: 20px;
  background: #f4f7f8;
  border-radius: 8px;
  font-family: Georgia, "Times New Roman", Times, serif;
}
.form fieldset {
  border: none;
}
.form legend {
  font-size: 1.4em;
  margin-bottom: 10px;
}
.form label {
  display: block;
  margin-bottom: 8px;
}
.form input[type="text"],
.form input[type="date"],
.form input[type="datetime"],
.form input[type="email"],
.form input[type="number"],
.form textarea,
.form select {
  font-family: Georgia, "Times New Roman", Times, serif;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 4px;
  font-size: 15px;
  margin: 0;
  outline: 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  background-color: #e8eeef;
  color: #8a97a0;
  -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
  margin-bottom: 30px;
}
.form input[type="text"]:focus,
.form input[type="date"]:focus,
.form input[type="email"]:focus,
.form input[type="number"]:focus,
.form textarea:focus,
.form select:focus {
  background: #d2d9dd;
}
.form select {
  -webkit-appearance: menulist-button;
  height: 35px;
}
.form .titulo {
  background: #1abc9c;
  color: #fff;
  height: 30px;
  width: 95px;
  display: inline-block;
  font-size: 0.8em;
  margin-right: 4px;
  line-height: 30px;
  text-align: center;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.2);
  border-radius: 15px 15px 15px 0px;
}

.form input[type="submit"],
.form input[type="button"] {
  position: relative;
  display: block;
  padding: 19px 39px 18px 39px;
  color: #fff;
  margin: 0 auto;
  background: #1abc9c;
  font-size: 18px;
  text-align: center;
  font-style: normal;
  width: 100%;
  border: 1px solid #16a085;
  border-width: 1px 1px 3px;
  margin-bottom: 10px;
}
.form input[type="submit"]:hover,
.form input[type="button"]:hover {
  background: #109177;
}
.container-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
.text-muted {
  color: #8a97a0;
  font-style: italic;
}
</style>