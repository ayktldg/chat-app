<template>
  <div class="stream h-screen bg-gradient-to-r from-gray-500 via-gray-600 to-gray-800">
    <div class="flex h-full">
      <UserList />
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import UserList from "@/components/UserList.vue";

export default {
  name: "Stream",
  components: {
    UserList,
  },
};
</script>
<style scoped>

</style>