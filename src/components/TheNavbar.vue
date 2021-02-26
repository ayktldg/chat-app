<template>
  <nav class="bg-green-200">
    <div
      class="container mx-auto flex justify-between items-center h-20 p-12 md:px-0"
    >
      <div class="logo">
        <router-link to="/" class="text-3xl font-bold"> ChatApp </router-link>
      </div>
      <div class="text-white">
        <button
          v-if="!isLoggedIn"
          @click="login"
          class="bg-gray-500 py-2 px-5 rounded-md hover:bg-gray-600"
        >
          Login with Google
        </button>
        <button
          v-else
          @click="logout"
          class="bg-gray-500 py-2 px-5 rounded-md hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TheNavbar",
  computed: {
    ...mapGetters({ isLoggedIn: "isLoggedIn" }),
  },
  methods: {
    async login() {
      await this.$store.dispatch("LOGIN");
    },
    async logout() {
      await this.$store.dispatch("LOGOUT");
    },
  },
  mounted(){
      console.log("status:", this.isLoggedIn)
  }
};
</script>

<style scoped>
</style>