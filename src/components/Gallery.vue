<template>
  <div>
    <h1>Gallery of Photos</h1>
    <section v-if="photos.length > 0" class="gallery__wrapper">
      <photo v-for="photo in photos" :photo="photo" :key="photo.id"></photo>
    </section>
    <button v-if="nextLink && !loading" @click="loadMore" class="button button--load">Load More</button>
    <button v-if="loading" class="button button--load" disabled>Loading...</button>
  </div>
</template>

<script>
import Photo from './Photo'

export default {
  name: 'gallery',

  data () {
    return {
      sortBy: ''
    }
  },

  computed: {
    photos () {
      return this.$store.state.photos
    },

    nextLink () {
      return this.$store.state.links.next
    },

    sortedPhotos () {
      return this.photos.sort(this.sortBy)
    },

    loading () {
      return this.$store.state.loading
    }
  },

  methods: {
    loadMore () {
      this.$store.dispatch('getMorePhotos')
    }
  },

  mounted () {
    this.$store.dispatch('getPhotos')
  },

  components: { Photo }
}
</script>

<style>
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}

.gallery__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
}

.button {
  border: 0;
  background-color: #42b983;
  outline: 0;
  color: white;
  padding: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.button:disabled {
  background-color: #42b;
  opacity: .5;
}

.button--load {
  padding: 10px 20px;
  margin: 20px 0;
}
</style>
