<template>
  <div>
    <Navbar v-show="estaAutenticado" />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
  computed: {
    estaAutenticado() {
      if (window.localStorage.getItem("admin-login")) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>