<template>
  <div class="login w-96">
    <h2 class="font-bold text-2xl">Login for messaging</h2>
    <form @submit.prevent="login">
      <div class="email my-5">
        <label for="email" class="block">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="inline-block rounded-md w-full p-1 mt-2 border"
          v-model="user.email"
        />
      </div>
      <div class="password my-5">
        <label for="password" class="block">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="inline-block rounded-md w-full p-1 mt-2 border"
          v-model="user.password"
        />
      </div>

      <button
        type="submit"
        class="bg-green-200 py-2 w-2/5 border rounded-md my-5"
      >
        Login
      </button>
    </form>
    <div>
      <router-link to="/register" class="text-dark">
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