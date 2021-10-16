<template>
  <header class="header">
    <nav class="navbar">
      <router-link to="/" class="nav-logo">Registro Usuarios</router-link>
      <ul class="nav-menu">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Inicio</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/crear-usuario" class="nav-link"
            >Crear usuario</router-link
          >
        </li>
        <li class="nav-item">
          <a class="nav-link pointer cerrar" @click="cerrarSesion"
            >Cerrar sesión</a
          >
        </li>
      </ul>
      <div class="hamburguesa" @click="menuHamburguer">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    menuHamburguer() {
      const hamburguesa = document.querySelector(".hamburguesa");
      const navMenu = document.querySelector(".nav-menu");
      const navLink = document.querySelectorAll(".nav-link");
      hamburguesa.addEventListener("click", menuMovil);
      navLink.forEach((n) => n.addEventListener("click", cerrarMenu));

      function menuMovil() {
        hamburguesa.classList.toggle("active");
        navMenu.classList.toggle("active");
      }

      function cerrarMenu() {
        hamburguesa.classList.remove("active");
        navMenu.classList.remove("active");
      }
    },
    cerrarSesion() {
      localStorage.removeItem("admin-login");
      window.location.href = "/";
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,500;1,400&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.cerrar {
  color: #7e0909;
  font-weight: bold;
}
html {
  font-size: 62.5%;
  font-family: "Roboto", sans-serif;
}
.pointer {
  cursor: pointer;
}
li {
  list-style: none;
}

a {
  text-decoration: none;
}

.header {
  border-bottom: 1px solid #e2e8f0;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
}

.hamburguesa {
  display: none;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: #101010;
}

.nav-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-item {
  margin-left: 5rem;
}

.nav-link {
  font-size: 1.6rem;
  font-weight: 400;
  color: #475569;
}

.nav-link:hover {
  color: #482ff7;
}

.nav-logo {
  font-size: 2.1rem;
  font-weight: 500;
  color: #482ff7;
}

@media only screen and (max-width: 768px) {
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 5rem;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    z-index: 3;
    height: 80%;
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-item {
    margin: 2.5rem 0;
  }

  .hamburguesa {
    display: block;
    cursor: pointer;
  }

  .hamburguesa.active .bar:nth-child(2) {
    opacity: 0;
  }

  .hamburguesa.active .bar:nth-child(1) {
    -webkit-transform: translateY(8px) rotate(45deg);
    transform: translateY(8px) rotate(45deg);
  }

  .hamburguesa.active .bar:nth-child(3) {
    -webkit-transform: translateY(-8px) rotate(-45deg);
    transform: translateY(-8px) rotate(-45deg);
  }
}
</style>