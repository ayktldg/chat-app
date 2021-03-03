<template>
  <div class="w-4/6">
    <div class="overflow-y-auto h-96">
      <MessageCard :otherUser="otherUser"/>
    </div>
    <div>
      <SendMessageInput :otherUser="otherUser"/>
    </div>
  </div>
</template>
<script>
import MessageCard from "@/components/MessageCard";
import SendMessageInput from "@/components/SendMessageInput.vue";
import { mapGetters } from "vuex";
export default {
  name: "ChatRoom",
  components: {
    MessageCard,
    SendMessageInput,
  },
   computed: {
    ...mapGetters({
      userList: "getUsers",
      currentUser: "getCurrentUser",
      chatInfo: "getChatRoom",
    }),
    otherUser() {
      const index = this.chatInfo.users.findIndex(
        (id) => id != this.currentUser.uid
      );
      const otherUserId = this.chatInfo.users[index];
      const user = this.userList.find((user) => user.id === otherUserId);
      return user;
    },
  },
};
</script>