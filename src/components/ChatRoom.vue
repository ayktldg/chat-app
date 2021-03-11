<template>
  <div
    class="md:w-4/6 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-800 flex flex-col justify-between"
  >
    <div class="flex border-b-2 border-gray-400 justify-between items-center">
      <h2 class="pl-4 text-xl font-bold py-4 text-gray-200">
        {{ otherUser.name }}
      </h2>
      <router-link to="/stream" class="sm:hidden">
        <i class="fas fa-arrow-left text-2xl text-gray-200 mr-8"
          ><span class="ml-2">back</span></i
        >
      </router-link>
    </div>
    <div v-if="messages.length > 0" class="flex flex-col overflow-y-auto pt-8">
      <MessageCard
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