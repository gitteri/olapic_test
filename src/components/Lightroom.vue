<template>
  <div v-if="!emptyObject(photo)"
       @click="closeLightroom"
       class="lightroom__wrapper">
    <div class="lightroom">
      <picture>
        <source :srcset="photo.images.mobile" media="(max-width: 599px)">
        <source :srcset="photo.images.normal" media="(min-width: 600px)">
        <source :srcset="photo.images.original" media="(min-width: 1200px)">
        <img class="lightroom__image"
             :src="photo.images.mobile">
      </picture>
      <p>
        <a class="lightroom__link" :href="photo.original_source" target="_blank">Original Shared Image</a>
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
  background-color: rgb(66, 185, 131);
  transition: .4 all;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
}

.lightroom {
  position: relative;
  max-width: 80%;
}

.lightroom__image {
  width: 100%;
}

.lightroom__link {
  color: white;
}
</style>
