<template>
  <nav class="bg-green-100">
    <div
      class="container mx-auto flex justify-between items-center h-20 p-12 md:px-0"
    >
      <div class="logo">
        <router-link to="/" class="text-3xl font-bold"> ChatApp </router-link>
      </div>
      <div v-if="!isLoggedIn">
        <button
          @click="login"
          class="bg-gray-500 text-white py-2 px-5 rounded-md hover:bg-gray-600"
        >
          Login with Google
        </button>
      </div>
      <div v-else class="flex">
        <div class="mr-4 rounded-full w-10 h-10">
          <img :src="user.photoURL" alt="image" class="rounded-full w-full h-full" />
        </div>
        <div class="hidden md:block md:mr-4">
           <p class="leading-4"><b>{{user.displayName}}</b></p>  
           <p><small>{{user.email}}</small></p>
        </div>
        <button
          @click="logout"
          class="bg-gray-500 text-white py-2 px-5 rounded-md hover:bg-gray-600"
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
    ...mapGetters({ isLoggedIn: "isLoggedIn", user: "getCurrentUser" }),
  },
  methods: {
    async login() {
      await this.$store.dispatch("LOGIN");
    },
    async logout() {
      await this.$store.dispatch("LOGOUT");
    },
  },
};
</script>

<style scoped>
</style>