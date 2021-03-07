<template>
  <div class="w-4/6">
    <div class="overflow-y-auto h-96">
      <div class="flex flex-col">
        <MessageCard
          v-for="(message, index) in messages"
          :key="index"
          :currentUser="currentUser"
          :message="message"
        />
      </div>
    </div>
    <div>
      <SendMessageInput :userList="userList" :currentUser="currentUser" />
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
      currentUser: "getCurrentUser",
      userList: "getUsers",
      messages: "getMessages",
    }),
  },
  created() {
    this.$store.dispatch("SET_MESSAGES", this.$route.params.id);
  },
};
</script>