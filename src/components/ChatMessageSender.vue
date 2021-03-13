<template>
  <div class="border-t-2 border-gray-300 py-3 px-4 md:p-6 flex items-center">
    <input
      type="textarea"
      class="py-2 px-4 w-full rounded-3xl bg-gray-200 focus:placeholder-gray-400 focus:outline-none focus:shadow-lg"
      v-model="message"
      @keyup.enter="sendMessage"
      placeholder="Message..."
    />
    <i
      class="far fa-paper-plane hover:opacity-80 text-2xl text-gray-200 cursor-pointer mx-2"
      @click="sendMessage"
    ></i>
  </div>
</template>
<script>
export default {
  name: "ChatMessageSender",
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage() {
      this.$store.dispatch("SEND_MESSAGE", {
        message: this.message,
        sender: this.currentUser.id,
        chat: this.$route.params,
      });
      this.message = "";
    },
  },
};
</script>