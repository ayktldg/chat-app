<template>
  <div class="w-2/6 overflow-y-auto bg-gray-700 py-4 text-gray-300 px-0">
    <h2 class="pl-3 md:pl-5 text-xl font-bold pb-4 border-b-2 border-gray-400">
      Users
    </h2>
    <UserListPersonCard
      v-for="user in userList"
      :key="user.id"
      :user="user"
      :currentUser="currentUser"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import UserListPersonCard from "@/components/UserListPersonCard";
export default {
  name: "UserList",
  components: {
    UserListPersonCard,
  },
  computed: {
    ...mapGetters({
      userList: "getUsers",
      currentUser: "getCurrentUser",
    }),
  },
  created() {
    this.$store.dispatch("SET_USERS");
  },
};
</script>

<style scoped>
</style>