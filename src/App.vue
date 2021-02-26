<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created(){
    this.$store.dispatch("CHECK_USER_STATUS")
  }
}
</script>

<style>

</style>
