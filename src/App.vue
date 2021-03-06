<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created(){
    this.$store.dispatch("USER_STATUS")
  }
}
</script>

<style>

</style>
