<template>
  <div class="bg-blue-100">
    <div class="flex">
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
  computed: {},
};
</script>