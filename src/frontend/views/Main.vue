<template>
  <div>
    <h1 class="titulo-principal">Usuarios registrados</h1>
    <div v-if="usuarios.length" class="buscador">
      <input
        type="text"
        v-model="buscador"
        class="form-control"
        placeholder="Buscar usuarios"
      />
    </div>
    <section v-if="!usuarios.length">
      <p class="sin-resultados">No existen usuarios registrados</p>
    </section>
    <section v-else class="container section-table">
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Email</th>
            <th>Sexo</th>
            <th>Fecha nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuariosListado" :key="usuario._id">
            <td data-label="nombre">{{ usuario.nombre }}</td>
            <td data-label="apellido">{{ usuario.apellido }}</td>
            <td data-label="edad">{{ usuario.edad }}</td>
            <td data-label="nombre">
              <small>{{ usuario.email }}</small>
            </td>
            <td data-label="sexo">{{ sexoUsuario(usuario.sexo) }}</td>
            <td data-labek="fecha">
              {{ formatearFecha(usuario.fechaNacimiento) }}
            </td>
            <td>
              <button
                class="boton boton-eliminar"
                @click="eliminarUsuario(usuario._id)"
              >
                <i class="fas fa-trash"></i>
              </button>
              <button
                class="boton boton-editar"
                @click="actualizarUsuario(usuario._id)"
              >
                <i class="fas fa-user-edit"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  name: "Main",
  data() {
    return {
      usuarios: [],
      buscador: "",
    };
  },
  created() {
    this.obtenerUsuarios();
  },
  beforeCreate() {
    document.body.classList.remove("login");
  },
  computed: {
    usuariosListado() {
      return (
        this.usuarios.filter((item) => {
          return (
            item.nombre.toLowerCase().includes(this.buscador.toLowerCase()) ||
            item.apellido.toLowerCase().includes(this.buscador.toLowerCase()) ||
            item.email.toLowerCase().includes(this.buscador.toLowerCase()) ||
            item.sexo.toLowerCase().includes(this.buscador.toLowerCase()) ||
            item.fechaNacimiento
              .toLowerCase()
              .includes(this.buscador.toLowerCase())
          );
        }) || []
      );
    },
  },
  methods: {
    obtenerUsuarios() {
      axios
        .get("http://localhost:3000/api/usuarios", {
          headers: {
            autenticacion: `${localStorage.getItem("admin-login")}`,
          },
        })
        .then((data) => {
          this.usuarios = data.data;
        })
        .catch((error) => {
          swal(`Ocurrio un error:${error} `, {
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
    },
    actualizarUsuario(usuarioId) {
      this.$router.push(`/usuario/${usuarioId}`);
    },
    formatearFecha(fechaEnviada) {
      return new Date(fechaEnviada).toLocaleDateString();
    },
    sexoUsuario(usuarioSexo) {
      if (usuarioSexo === "Masculino") {
        return "M";
      } else {
        return "F";
      }
    },
    eliminarUsuario(usuarioId) {
      if (!usuarioId) return;
      swal({
        title: "Eliminar",
        text: "¿Esta seguro en eliminar el usuario seleccionado?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((confirmado) => {
        if (confirmado) {
          axios
            .delete(`http://localhost:3000/api/usuarios/${usuarioId}`, {
              headers: {
                autenticacion: `${localStorage.getItem("admin-login")}`,
              },
            })
            .then((response) => {
              if (response.data.msg === "Eliminado") {
                this.obtenerUsuarios();
                swal("Usuario eliminado correctamente", {
                  icon: "success",
                });
              }
            })
            .catch((error) => {
              swal(`Ocurrió un error: ${e}`, {
                icon: "error",
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
        }
      });
    },
  },
};
</script>
<style>
.boton {
  cursor: pointer;
  color: #fff;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
.boton-eliminar {
  background-color: #ff0000;
  border: none;
}
.boton-editar {
  background-color: #0ac00a;
  border: none;
}
.boton-eliminar:hover {
  background-color: #aa0505;
  border: none;
}
.boton-editar:hover {
  background-color: #168316;
  border: none;
}
.titulo-principal {
  text-align: center;
  text-transform: uppercase;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-weight: 200;
  font-size: 2em;
  color: #116161;
}
</style>
<style lang="css" scoped>
.buscador {
  margin-bottom: 1em;
  text-align: center;
  display: flex;
  justify-content: center;
}
input[type="text"] {
  border: 1px solid grey;
  border-radius: 5px;
  width: 30%;
  padding: 2px 23px 2px 30px;
  outline: 0;
  background-color: #f5f5f5;
  padding: 6px;
  border: 1px solid #ccc;
  margin-top: 8px;
  font-size: 17px;
}
input[type="text"] {
  transition: width 0.4s ease-in-out;
}

input[type="text"]:focus {
  width: 40%;
}

@media screen and (max-width: 600px) {
  input[type="text"] {
    float: none;
    display: block;
    text-align: center;
    width: 50%;
    margin: 0;
    padding: 14px;
  }
  input[type="text"] {
    border: 1px solid #ccc;
  }
}
.section-table {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
  padding: 2em;
  max-width: 52em;
}

.sin-resultados {
  text-align: center;
  text-transform: capitalize;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.5em;
  font-weight: 200;
}
table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
}

thead th:nth-child(1) {
  width: 10%;
}

thead th:nth-child(2) {
  width: 10%;
}

thead th:nth-child(3) {
  width: 10%;
}
thead th:nth-child(4) {
  width: 30%;
}

thead th:nth-child(5) {
  width: 10%;
}
thead th:nth-child(6) {
  width: 10%;
}
thead th:nth-child(7) {
  width: 20%;
}

th,
td {
  padding: 20px;
}
thead th,
tfoot th {
  font-size: 13px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

th {
  letter-spacing: 2px;
}

td {
  letter-spacing: 1px;
}

tbody td {
  text-align: center;
}

tfoot th {
  text-align: right;
}

table {
  border-collapse: collapse;
}

th {
  font-size: 13px;
  font-weight: normal;
  background: #b9c9fe;
  border-top: 4px solid #aabcfe;
  border-bottom: 1px solid #fff;
  color: #002d3f;
}

td {
  background: #eee;
  border-bottom: 1px solid #fff;
  color: #669;
  border-top: 1px solid transparent;
}

tr:hover td {
  background: #d0dafd;
  color: #339;
}
@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
  }

  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }

  td:nth-of-type(1):before {
    content: "Nombre";
  }
  td:nth-of-type(2):before {
    content: "Apellido";
  }
  td:nth-of-type(3):before {
    content: "Edad";
  }
  td:nth-of-type(4):before {
    content: "Email";
  }
  td:nth-of-type(5):before {
    content: "Sexo";
  }
  td:nth-of-type(6):before {
    content: "Fecha de nacimiento";
  }
  td:nth-of-type(7):before {
    content: "Acciones";
  }
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
}

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.8em;
    text-align: right;
  }

  table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
}
</style>