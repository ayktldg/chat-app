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
import { mapGetters } from "vuex";
export default {
  name: "SendMessageInput",
  props: {
    otherUser: {
      type: Object,
      required: true
    }
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
        from: this.currentUser.uid,
        to: this.otherUser.id,
        chat: this.$route.params,
      });  
      this.message = "";
    },
  },
  computed: {
    ...mapGetters({
      userList: "getUsers",
      currentUser: "getCurrentUser",
    }),
  },
};
</script>