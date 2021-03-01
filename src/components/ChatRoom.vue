<template>
  <div>
    <div class="overflow-y-auto">
      <MessageCard />
      <MessageCard />
      <MessageCard />
    </div>
    <div>
      <SendMessageInput />
    </div>
  </div>
</template>
<script>
import MessageCard from "@/components/MessageCard";
import SendMessageInput from "@/components/SendMessageInput.vue";
export default {
  name: "ChatRoom",
  components: {
    MessageCard,
    SendMessageInput,
  },
};
</script>