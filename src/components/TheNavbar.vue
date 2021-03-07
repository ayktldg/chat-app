<template>
  <nav class="bg-green-100">
    <div
      class="container mx-auto flex justify-between items-center h-20 p-12 md:px-0"
    >
      <div class="logo">
        <router-link to="/" class="text-3xl font-bold"> ChatApp </router-link>
      </div>
      <div v-if="!currentUser.id">
        <router-link
          tag="button"
          to="/register"
          class="bg-gray-500 text-white py-2 px-5 rounded-md hover:bg-gray-600"
        >
          Register
        </router-link>
      </div>
      <div v-else class="flex">
        <div class="mr-4 rounded-full w-10 h-10 pl-3 pt-2 bg-blue-900">
          <span class="text-white font-bold text-xl leading-none">{{
            currentUser.name.charAt(0)
          }}</span>
        </div>
        <div class="hidden md:block md:mr-4">
          <p class="leading-4">
            <b>{{ currentUser.name }}</b>
          </p>
          <p>
            <small>{{ currentUser.email }}</small>
          </p>
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
    ...mapGetters({
      currentUser: "getCurrentUser",
      userList: "getUsers",
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT");
    },
  },
};
</script>

<style scoped>
</style>