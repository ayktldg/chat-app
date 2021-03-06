<template>
  <div class="home">
    <TheNavbar />
    <h1>home</h1>
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import TheNavbar from "@/components/TheNavbar.vue";
import Login from "@/components/Login.vue";
export default {
  name: "Home",
  components: {
    TheNavbar,
    Login
  },
};
</script>
