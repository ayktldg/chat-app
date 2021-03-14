<template>
  <div
    class="w-4/6 h-full bg-gradient-to-r from-gray-500 via-gray-600 to-gray-800 flex flex-col justify-between"
  >
    <div
      class="flex border-b-2 text-gray-200 border-gray-400 justify-between items-center"
    >
      <h2 class="pl-4 text-xl font-bold py-4">
        {{ otherUser.name }}
      </h2>
    </div>
    <div v-if="messages.length > 0" class="flex flex-col overflow-y-auto pt-8">
      <ChatMessageCard
        v-for="(message, index) in messages"
        :key="index"
        :currentUser="currentUser"
        :message="message"
      />
    </div>
    <div v-else>
      <h3 class="text-center text-lg font-semibold text-gray-200">
        There is no message yet
      </h3>
    </div>
    <div>
      <ChatMessageSender :userList="userList" :currentUser="currentUser" />
    </div>
  </div>
</template>
<script>
import ChatMessageCard from "@/components/ChatMessageCard";
import ChatMessageSender from "@/components/ChatMessageSender.vue";
import { mapGetters } from "vuex";
export default {
  name: "ChatRoom",
  components: {
    ChatMessageCard,
    ChatMessageSender,
  },
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
      otherUser: "getOtherUser",
      userList: "getUsers",
      messages: "getMessages",
    }),
  },
  created() {
    this.$store.dispatch("SET_MESSAGES", this.$route.params.id);
  },
};
</script>