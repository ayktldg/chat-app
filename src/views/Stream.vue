<template>
  <div class="bg-blue-100">
    <TheNavbar />
    <div class="flex">
      <UserList />
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import TheNavbar from "@/components/TheNavbar.vue";
import UserList from "@/components/UserList.vue";

export default {
  name: "Stream",
  components: {
    TheNavbar,
    UserList,
  },
  computed: {},
};
</script>