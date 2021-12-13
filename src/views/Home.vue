<template>
  <div
    class="home bg-gradient-to-r from-gray-200 via-gray-500 to-gray-600 flex justify-center items-center"
  >
    <div class="container mx-auto md:flex">
      <div
        class="md:w-4/6 px-2 text-gray-800 font-black md:text-7xl text-3xl leading-tight break-words self-center "
      >
        <p class="mb-2">Welcome.</p>
        <p>Let's discover people and start talking...</p>
      </div>
      <div class="md:w-2/6 px-2 mt-8 md:mt-0 justify-center">
        <Login />
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
export default {
  name: "Home",
  components: {
    Login,
  },
};
</script>
<style>
.home {
  height: calc(100vh - 204px);
}
</style>
