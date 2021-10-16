<template>
  <div>
    <h1 class="titulo-principal">Actualizar usuario</h1>
    <div class="container">
      <div class="container-form">
        <div class="form">
          <form @submit.prevent="actualizarUsuario">
            <fieldset>
              <legend>
                <span class="titulo">Actualizar</span> la información del
                usuario
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
            <input
              type="submit"
              class="actualizar-btn"
              value="Actualizar usuario"
            />
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
  name: "ActualizarUsuario",
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
  mounted() {
    this.obtenerUsuario();
  },
  methods: {
    obtenerUsuario() {
      axios
        .get(`http://localhost:3000/api/usuarios/${this.$route.params.id}`, {
          headers: {
            autenticacion: `${localStorage.getItem("admin-login")}`,
          },
        })
        .then((response) => {
          this.usuario = {
            ...response.data,
            fechaNacimiento: new Date(response.data.fechaNacimiento)
              .toISOString()
              .substring(0, 10),
          };
        })
        .catch((error) => {
          swal(`Ocurrió un error: ${error.msg}`, {
            icon: "error",
            title: "Error obteniendo el usuario",
          });
          this.$router.push("/");
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
    },
    actualizarUsuario() {
      if (
        !this.usuario.nombre ||
        !this.usuario.apellido ||
        !this.usuario.edad ||
        !this.usuario.email ||
        !this.usuario.sexo ||
        !this.usuario.fechaNacimiento
      ) {
        swal("Todos los campos son requeridos", {
          icon: "warning",
          title: "Error al actualizar usuario",
        });
        return;
      }
      axios
        .put(
          `http://localhost:3000/api/usuarios/${this.$route.params.id}`,
          this.usuario,
          {
            headers: {
              autenticacion: `${localStorage.getItem("admin-login")}`,
            },
          }
        )
        .then((response) => {
          swal(`${response.data.msg} `, {
            icon: "success",
            title: "Actualización correcta",
          });
          this.$router.push("/");
        })
        .catch((error) => {
          swal(`Ocurrió un error: ${error.msg}`, {
            icon: "error",
            title: "Error en la actualización",
          });
          this.$router.push("/");
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
    },
  },
};
</script>

<style scoped>
.actualizar-btn {
  background: #1e5e8c !important;
  border: 1px solid #1e5e8c !important;
}
</style>