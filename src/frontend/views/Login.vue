<template>
  <form @submit.prevent="iniciarSesion">
    <div class="contenedor-login">
      <p>Registro<span class="login-titulo">Usuarios</span></p>
      <input
        type="email"
        required
        name="email"
        placeholder="Ingresa el email"
        class="login-form"
        v-model.trim="admin.usuario"
      />
      <input
        type="password"
        required
        name="password"
        class="login-form"
        placeholder="Ingresa la clave"
        v-model.trim="admin.clave"
        min="5"
      />
      <input type="submit" value="Iniciar sesión" class="login-btn" />
    </div>
  </form>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  name: "Login",
  data() {
    return {
      admin: {
        email: "",
        password: "",
      },
    };
  },
  beforeCreate() {
    document.body.className = "login";
  },
  methods: {
    iniciarSesion() {
      if (!this.admin.usuario || !this.admin.clave) {
        swal("Ingrese los datos", {
          icon: "error",
          button: false,
          title: "Usuario y Clave son necesarios",
        });
        return;
      }
      if (this.admin.clave.length < 5) {
        swal("Ingrese la clave ", {
          icon: "error",
          button: false,
          title: "La clave debe tener al menos 5 caracteres",
        });
        return;
      }
      axios
        .post("http://localhost:3000/api/login/autenticarAdmin", this.admin)
        .then((res) => {
          if (res.data.msg === "Autenticación correcta") {
            swal(res.data.msg, {
              icon: "success",
              button: false,
              title: "Bienvenido",
            });
            localStorage.setItem("admin-login", res.data.adminId);
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          } else {
            swal(res.data.msg, {
              icon: "error",
              title: "Error autenticado el administrador",
            });
          }
        })
        .catch((error) => {
          swal(error.response.data.msg, {
            icon: "error",
            button: false,
            title: "Error autenticado el administrador",
          });
        });
      this.admin.usuario = "";
      this.admin.clave = "";
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.p-subtitle {
  color: #1abc9c;
  padding: 0px 6px;
}

.contenedor-login {
  display: flex;
  flex-direction: column;
  margin: 20vh auto;
  width: 500px;
  padding: 30px;
  align-items: center;
  justify-content: center;
  background-color: white;
}
.contenedor-login p {
  font-size: 30pt;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: #2f3542;
  margin-top: 20px;
  margin-bottom: 30px;
}

.login-titulo {
  color: #1abc9c;
}

.login-form {
  margin: 8px 0;
  padding: 16px 12px;
  width: 350px;
  outline-style: none;
  border: none;
  font-family: "Raleway";
  font-size: 12pt;
  font-weight: 500;
  border: none;
  border: solid 4px rgb(235, 235, 235);
}

.login-btn {
  width: 350px;
  border: none;
  background-color: #1abc9c;
  font-size: "Raleway";
  font-weight: 700;
  color: white;
  font-size: 18pt;
  padding: 16px 0px;
  margin-top: 20px;
  margin: 20px 0;
  cursor: pointer;
}

.login-form:focus {
  border: solid 4px black;
  transition: 0.2s;
}

.login-btn:active {
  outline-style: none;
  border: none;
}
</style>