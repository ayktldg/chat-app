<template>
  <div class="w-full pl-4 pr-4 mb-4 flex" v-show="user.id !== currentUser.id">
    <div class="w-1/6 p-2">
      <img
        :src="user.photoURL"
        alt="image"
        class="rounded-full w-full h-full"
      />
    </div>
    <div class="border-b-2 border-black w-5/6">
      <p @click="openChat">
        <b>{{ user.name }}</b>
      </p>
      <p>{{ user.email }}</p>
    </div>
    <button @click="setChat" class="bg-gray-200">
      {{ isChatCreated ? "Delete Chat" : "Create Chat" }}
    </button>
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
  created() {
    console.log(this.user);
  },
};
</script>