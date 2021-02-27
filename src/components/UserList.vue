<template>
  <ul class="md:w-2/6 overflow-y-auto h-96 bg-green-200 py-6">
    <li
      v-for="user in userList"
      :key="user.id"
      class="w-full pl-4 pr-4 mb-4 flex"
    >
      <div class="w-1/6 p-2">
        <img :src="user.photoURL" alt="image" class="rounded-full w-full h-full" />
      </div>
      <div class="border-b-2 border-black w-5/6">
        <p>
          <b>{{ user.name }}</b>
        </p>
        <p>{{ user.email }}</p>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "UserList",
  computed: {
    ...mapGetters({ userList: "getUsers" }),
  },
  created() {
    this.$store.dispatch("SET_USERS");
  },
};
</script>