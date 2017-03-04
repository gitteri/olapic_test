<template>
  <div v-if="!emptyObject(photo)"
       @click="closeLightroom"
       class="lightroom__wrapper">
    <div class="lightroom">
      <img :src="photo.images.normal" />
      <p>
        <a :href="photo.original_source" target="_blank">Link to original shared image</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'photo',

  computed: {
    photo () {
      return this.$store.state.lightroom
    }
  },

  methods: {
    closeLightroom () {
      this.$store.dispatch('closeLightroom')
    },

    emptyObject (obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object
    }
  }
}
</script>

<style>
.lightroom__wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0,0,0,.7);
  transition: .4 all;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
}
</style>
