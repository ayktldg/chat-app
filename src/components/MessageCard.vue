<template>
  <ul class="message flex flex-col">
    <li
      v-for="(message, index) in messages"
      :key="index"
      :class="[message.from == currentUser.uid ? 'self-end' : 'self-start']"
      class="w-3/5 bg-indigo-300 rounded-xl p-4 m-4"
      
    >
      <h3 class="border-b-2 border-gray-600 mb-4 font-bold">{{ user.name }}</h3>
      <p>{{ message.message }}</p>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "MessageCard",
  props: {
    otherUser: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      userList: "getUsers",
      currentUser: "getCurrentUser",
      messages: "getMessages",
    }),
    user() {
      const currentUser = this.userList.find(
        (element) => element.id === this.currentUser.uid
      );
      const whichUser = this.messages.forEach((element) => {
        if (element.from === currentUser.id) {
          return true;
        } else {
          return false;
        }
      });
      if (whichUser) {
        return currentUser;
      } else {
        return this.otherUser;
      }
    },
  },
  created() {
    this.$store.dispatch("GET_MESSAGES", this.$route.params.id);
  },
};
</script>