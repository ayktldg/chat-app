<template>
  <div
    class="w-full py-2 pl-3 md:px-4 flex text-sm md:text-base"
    v-show="user.id !== currentUser.id"
  >
    <div class="py-2">
      <div
        @click="openChat"
        class="mr-4 rounded-full w-10 h-10 bg-gray-200 hidden md:flex justify-center items-center cursor-pointer hover:opacity-80"
      >
        <span class="text-gray-800 font-semibold text-3xl leading-none">{{
          user.name.charAt(0)
        }}</span>
      </div>
    </div>
    <div class="border-b-2 border-gray-400 w-5/6 flex justify-between">
      <div
        @click="openChat"
        class="cursor-pointer hover:opacity-80 self-center break-all"
      >
        <b class="">{{ user.name }}</b>
      </div>
      <div class="self-center hover:opacity-80 cursor-pointer">
        <i
          v-if="isChatCreated"
          @click="openChat"
          class="fas fa-sign-in-alt text-xl"
        ></i>
        <span
          v-else
          @click="setChat"
          class="text-gray-200 underline text-xs md:text-sm ml-1"
        >
          Start Chat
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setChat() {
      this.$store.dispatch("CREATE_CHATROOM", this.user);
    },
    openChat() {
      this.$store.dispatch("OPEN_CHAT", this.user);
    },
  },
  computed: {
    isChatCreated() {
      if (this.user.chats && this.currentUser.chats) {
        const intersection = this.user.chats.filter((chat) =>
          this.currentUser.chats.includes(chat)
        );
        if (intersection.length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
};
</script>
