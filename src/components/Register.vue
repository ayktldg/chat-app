<template>
  <div
    class="bg-gradient-to-r from-gray-200 via-gray-500 to-gray-600 pt-20 pb-16 md:pb-12 md:pt-16"
  >
    <div class="container mx-auto w-3/4 md:w-1/2">
      <h2 class="font-bold text-3xl md:text-4xl">
        Register for contact people
      </h2>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(register)" class="mb-20 md:mb-16">
          <div class="name my-5">
            <label for="name" class="block text-lg font-semibold"
              >Username</label
            >
            <ValidationProvider
              mode="passive"
              rules="required|alpha"
              v-slot="{ errors }"
            >
              <input
                type="text"
                name="name"
                id="name"
                class="inline-block rounded-md w-full p-1 mt-2 border"
                v-model="user.name"
              />
              <span class="text-center font-bold text-base text-red-800 italic">{{
                errors[0]
              }}</span>
            </ValidationProvider>
          </div>
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
                class="inline-block rounded-md w-full p-1 mt-2 border"
                v-model="user.email"
              />
              <span class="text-center font-bold text-base text-red-800 italic">{{
                errors[0]
              }}</span>
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
                class="inline-block rounded-md w-full p-1 mt-2 border"
                v-model="user.password"
              />
              <span class="text-center font-bold text-base text-red-800 italic">{{
                errors[0]
              }}</span>
            </ValidationProvider>
          </div>
          <button
            type="submit"
            class="bg-transparent text-lg font-semibold border-2 border-gray-100 w-2/5 justify-end my-5 text-white py-2 rounded-3xl hover:bg-gray-600 focus:outline-none"
          >
            Register
          </button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      this.$store.dispatch("REGISTER", this.user);
    },
  },
};
</script>