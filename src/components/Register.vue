<template>
  <div class="register">
    <TheNavbar />
    <div class="container mx-auto w-3/4 md:w-1/2">
      <h2 class="font-bold text-3xl md:text-4xl mt-20 mb-16 md:mb-12 md:mt-16">
        Register for contact people
      </h2>
      <form @submit.prevent="register" class="mb-20 md:mb-16">
          <div class="name my-5">
          <label for="name" class="block">Username</label>
          <input
            type="text"
            name="name"
            id="name"
            class="inline-block rounded-md w-full p-1 mt-2 border"
            v-model="user.name"
          />
        </div>
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
          Register
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import TheNavbar from "@/components/TheNavbar.vue";
//import TheFooter from "@/components/TheFooter.vue";
export default {
  name: "Register",
  components: {
    TheNavbar,
    //TheFooter,
  },
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
      //this.$router.push("/stream");
    },
  },
};
</script>