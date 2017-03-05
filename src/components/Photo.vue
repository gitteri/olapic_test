<template>
  <div class="photo" :class="{'photo__selected': selected}">
    <figure class="photo__wrapper" v-if="photo && photo.images">
      <picture class="photo__container">
        <source :srcset="photo.images.mobile" media="(max-width: 599px)">
        <source :srcset="photo.images.normal" media="(min-width: 600px)">
        <source :srcset="photo.images.original" media="(min-width: 1200px)">
        <img class="photo__img"
             @click.self="openLightroom()"
             :src="photo.images.mobile"
             :alt="photo.caption">
      </picture>
      <button class="photo__select button" disabled v-if="selected">Selected</button>
      <button class="photo__select button" @click.self="submitPhoto" v-else>Select Photo</button>
      <figcaption class="photo__caption">
        <a :href="instagramLink(photo._embedded.uploader.social_connections)"
           target="_blank"
           class="photo__author">{{ photo._embedded.uploader.name }}</a>
        {{ photo.caption }}
      </figcaption>
    </figure>
    <p class="photo__likes">Likes: {{photo.likes}}</p>
  </div>
</template>

<script>
export default {
  name: 'photo',

  data () {
    return {
      selected: false
    }
  },

  methods: {
    submitPhoto () {
      this.selected = true
      this.$store.dispatch('submitPhoto', this.photo)
    },

    instagramLink (social) {
      if (social.instagram) {
        return `https://www.instagram.com/${social.instagram.username}`
      }
    },

    openLightroom () {
      this.$store.dispatch('openLightroom', this.photo)
    }
  },

  props: ['photo']
}
</script>

<style>
figure {
  margin: 0;
}

.photo {
  flex-basis: 25%;
  max-width: 25%;
  height: auto;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  transition: .4s opacity;
}

.photo__selected {
  opacity: .5;
}

.photo__wrapper {
  position: relative;
}

.photo__img {
  max-width: 100%;
}

.photo__select {
  position: absolute;
  top: 5%;
  width: 50%;
  left: 25%;
}

.photo__select:disabled {
  cursor: normal;
}

.photo:hover .photo__caption {
  opacity: 1;
  visibility: visible;
}

.photo__caption {
  background-color: rgba(0,0,0,.5);
  position: absolute;
  bottom: 6px;
  width: 100%;
  max-height: 40%;
  overflow-y: scroll;
  padding: 20px 25px;
  box-sizing: border-box;
  color: white;
  opacity: 0;
  transition: .4s opacity;
  visibility: hidden;
}

.photo__author {
  font-weight: bold;
  display: block;
}

.photo__likes {
  margin: 0;
}

@media (max-width: 959px) {
  .photo {
    flex-basis: 33%;
    max-width: 33%;
  }

  .photo__caption {
    position: relative;
    display: block;
    opacity: 1;
    visibility: visible;
    background: none;
    padding: 5px;
    color: #2c3e50;
  }
}

@media (max-width: 680px) {
  .photo {
  flex-basis: 50%;
    max-width: 50%;
  }
}

@media (max-width: 468px) {
  .photo {
    flex-basis: 100%;
    max-width: 100%;
    margin: 10px 0;
    border-bottom: 1px solid rgba(44, 62, 80, .2);
  }
}
</style>
