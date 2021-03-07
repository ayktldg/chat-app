<template>
  <div class="w-full pl-4 pr-4 mb-4 flex" v-show="user.id !== currentUser.id">
    <div class="w-1/6 p-2">
      <div class="mr-4 rounded-full w-10 h-10 pl-3 pt-2 bg-blue-900">
        <span class="text-white font-bold text-xl leading-none">{{
          user.name.charAt(0)
        }}</span>
      </div>
    </div>
    <div class="border-b-2 border-black w-4/6">
      <p @click="openChat">
        <b>{{ user.name }}</b>
      </p>
      <p>{{ user.email }}</p>
    </div>
    <div class="w-1/6">
      <button
        @click="setChat"
        :class="isChatCreated ? 'bg-red-300' : 'bg-blue-300'"
      >
        {{ isChatCreated ? "Delete Chat" : "Create Chat" }}
      </button>
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
      if (this.isChatCreated) console.log("deleted");
      else this.$store.dispatch("CREATE_CHATROOM", this.user);
    },
    deleteChat() {},
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