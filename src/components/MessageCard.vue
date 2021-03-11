<template>
  <div :class="messageLocation" class="w-3/4 md:w-auto md:max-w-md my-2 mx-4">
    <div :class="messageBg" class="rounded-3xl shadow-lg px-4 py-2">
      <p class="text-gray-200 break-words">
        {{ message.message }}
      </p>
    </div>
    <div>
      <p class="text-xs italic text-gray-200 mt-2 text-center">
        {{ messageTime }}
      </p>
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
      if (this.message.sender == this.currentUser.id) {
        return "self-end";
      } else {
        return "self-start";
      }
    },
    messageBg() {
      if (this.message.sender == this.currentUser.id) {
        return "bg-red-900";
      } else {
        return "bg-indigo-900";
      }
    },
    messageTime() {
      const timeInMilis = this.message.time.seconds * 1000;
      const timeArr = new Date(timeInMilis).toUTCString().split(" ");
      const formattedTime = timeArr.slice(1, 5).join(" ");
      return formattedTime;
    },
  },
};
</script>