<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'weightlist',
    methods: {
      registerTrayListener() {
        this.$electron.ipcRenderer.on('tray-menu-item-clicked', (event, view) => {
        this.$router.push(view)
      })
      }
    },
    created() {
      this.registerTrayListener()
    }
  }
</script>

<style>
  /* CSS */
</style>
