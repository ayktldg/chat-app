<template>
  <div :class="messageLocation" class=" w-3/4 md:w-auto md:max-w-md my-2 mx-4">
    <div :class="messageBg" class="rounded shadow-lg p-4">
      <p class="text-gray-700 break-words">
        {{ message.message }}
      </p>
    </div>
    <div>
      <p class="text-xs italic text-gray-500 mt-2 text-center">{{ messageTime }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "MessageCard",
  props: {
    message: {
      type: Object,
      required: true,
    },
    currentUser: {
      type: Object,
      required: true,
    },
  },
  computed: {
    messageLocation() {
      if (this.message.sender == this.currentUser.uid) {
        return "self-end";
      } else {
        return "self-start";
      }
    },
    messageBg() {
      if (this.message.sender == this.currentUser.uid) {
        return "bg-red-400";
      } else {
        return "bg-indigo-300";
      }
    },
    messageTime() {
      const timeArr = this.message.time.toDate().toUTCString().split(" ");
      const formattedTime = timeArr.slice(1, 5).join(" ");
      return formattedTime;
    },
  },
};
</script>