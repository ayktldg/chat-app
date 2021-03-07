<template>
  <div class="md:w-2/6 overflow-y-auto h-96 bg-green-200 py-6">
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