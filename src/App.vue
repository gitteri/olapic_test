<template>
  <div id="app">
    <div v-if="error">
      <p> {{ error }}</p>
    </div>
    <router-view></router-view>
    <lightroom></lightroom>
  </div>
</template>

<script>
import Lightroom from './components/Lightroom'

export default {
  name: 'app',

  computed: {
    error () {
      return this.$store.state.error
    }
  },

  components: { Lightroom }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
