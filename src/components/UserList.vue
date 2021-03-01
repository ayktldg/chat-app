<template>
  <ul class="md:w-2/6 overflow-y-auto h-96 bg-green-200 py-6">
    <li
      v-for="user in userList"
      :key="user.id"
      class="w-full pl-4 pr-4 mb-4 flex"
      v-show="user.id !== currentUser.uid"
    >
      <div class="w-1/6 p-2">
        <img
          :src="user.photoURL"
          alt="image"
          class="rounded-full w-full h-full"
        />
      </div>
      <div class="border-b-2 border-black w-5/6">
        <p @click="openChat(user)">
          <b>{{ user.name }}</b>
        </p>
        <p>{{ user.email }}</p>
      </div>
      <button @click="setChat(user)" class="bg-gray-200">create</button>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "UserList",
  computed: {
    ...mapGetters({
      userList: "getUsers",
      currentUser: "getCurrentUser",
    }),
  },
  methods: {
    setChat(user) {
      this.$store.dispatch("CREATE_CHATROOM", user);
    },
    openChat(user) {
      this.$store.dispatch("OPEN_CHAT", user);
    },
  },
  created() {
    this.$store.dispatch("SET_USERS");
  },
};
</script>