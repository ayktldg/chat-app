<template>
  <div class=" bg-blue-100">
    <TheNavbar />
    <UserList />
  </div>
</template>
<script>
import TheNavbar from "@/components/TheNavbar.vue";
import UserList from "@/components/UserList.vue";
export default {
  name: "Stream",
  components: {
    TheNavbar,
    UserList
  },
  computed: {},
};
</script>