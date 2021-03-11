<template>
  <div class="login text-gray-900">
    <h2 class="font-bold text-2xl">Login for talking.</h2>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(login)">
        <div class="email my-5">
          <label for="email" class="block text-lg font-semibold">Email</label>
          <ValidationProvider
            mode="passive"
            rules="required|email"
            v-slot="{ errors }"
          >
            <input
              type="email"
              name="email"
              id="email"
              class="inline-block rounded-2xl w-full py-1 px-3 mt-2 focus:outline-none focus:shadow-lg"
              v-model="user.email"
            />
            <span class="text-center font-bold text-base text-red-800 italic">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="password my-5">
          <label for="password" class="block text-lg font-semibold"
            >Password</label
          >
          <ValidationProvider
            mode="passive"
            rules="required|min:6"
            v-slot="{ errors }"
          >
            <input
              type="password"
              name="password"
              id="password"
              class="inline-block rounded-2xl w-full py-1 px-3 mt-2 focus:outline-none focus:shadow-lg"
              v-model="user.password"
            />
            <span class="text-center font-bold text-base text-red-800 italic">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>

        <button
          type="submit"
          class="bg-transparent border-2 text-lg font-semibold border-gray-100 w-2/5 justify-end my-5 text-white py-2 rounded-3xl hover:bg-gray-600 focus:outline-none"
        >
          Login
        </button>
      </form>
    </ValidationObserver>
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
      this.clearForm();
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