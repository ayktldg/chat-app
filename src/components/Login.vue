<template>
  <div class="login text-gray-900">
    <h2 class="font-bold text-2xl">Login for talking.</h2>
    <form @submit.prevent="login">
      <div class="email my-5">
        <label for="email" class="block text-lg font-semibold">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="inline-block rounded-2xl w-full py-1 px-3 mt-2 focus:outline-none focus:shadow-lg"
          v-model="user.email"
        />
      </div>
      <div class="password my-5">
        <label for="password" class="block text-lg font-semibold">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="inline-block rounded-2xl w-full py-1 px-3 mt-2 focus:outline-none focus:shadow-lg"
          v-model="user.password"
        />
      </div>

      <button
        type="submit"
        class="bg-transparent border-2 text-lg font-semibold border-gray-100 w-2/5 justify-end my-5 text-white py-2 rounded-3xl hover:bg-gray-600 focus:outline-none"
      >
        Login
      </button>
    </form>
    <div>
      <router-link to="/register" class="text-gray-900 hover:text-black">
        Not an User?
        <strong>Create account</strong>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("LOGIN", this.user);
      this.clearForm()
    },
    clearForm() {
      this.user = {
        email: "",
        password: "",
      };
    },
  },
};
</script>