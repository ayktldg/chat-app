<template>
  <nav class="bg-gray-800">
    <div
      class="container mx-auto flex justify-between items-center p-8 md:px-0"
    >
      <div class="logo">
        <router-link to="/stream" class="text-3xl font-bold hover:opacity-80 text-gray-200"> ChatApp </router-link>
      </div>
      <div v-if="!currentUser.id">
        <router-link
          to="/register"
          class=" bg-transparent text-lg font-semibold border-2 border-gray-100 text-white py-2 px-5 rounded-3xl hover:opacity-80"
        >
          Register
        </router-link>
      </div>
      <div v-else class="flex">
        <div class="mr-4 rounded-full w-10 h-10 bg-gray-200 flex justify-center items-center">
          <span class="text-gray-800 font-semibold text-3xl leading-none">{{
            currentUser.name.charAt(0)
          }}</span>
        </div>
        <div class="hidden md:block md:mr-4 text-gray-200">
          <p class="leading-4">
            <b>{{ currentUser.name }}</b>
          </p>
          <p>
            <small>{{ currentUser.email }}</small>
          </p>
        </div>
        <button
          @click="logout"
           class=" bg-transparent border-2 text-lg font-semibold border-gray-100 text-white py-2 px-5 rounded-3xl hover:opacity-80 focus:outline-none leading-none"
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