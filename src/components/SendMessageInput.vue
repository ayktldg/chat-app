<template>
  <div class="w-full bg-blue-200 p-6">
    <input
      type="textarea"
      class="p-2 w-full border-2 rounded-3xl"
      v-model="message"
      @keyup.enter="sendMessage"
    />
  </div>
</template>
<script>
export default {
  name: "SendMessageInput",
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
        sender: this.currentUser.uid,
        chat: this.$route.params,
      });
      this.message = "";
    },
  },
};
</script>