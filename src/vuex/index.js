import Vue from 'vue'
import Vuex from 'vuex'
import { getPhotos } from '../library/olapic'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    photos: [],
    links: [],
    lightroom: {},
    loading: false,
    error: ''
  },

  actions: {
    getPhotos ({commit}, url = '') {
      commit('toggleLoading')
      getPhotos(url).then((res) => {
        // Can add more checks to make sure media exists and that the response is a success
        if (res.data && res.data.data && res.data.data._embedded && res.data.data._links && res.data.data._embedded.media) {
          commit('storePhotos', res.data.data._embedded.media)
          commit('storeLinks', res.data.data._links)
          commit('error', '')
        } else {
          commit('error', 'Could not verify images and links from Olapic')
        }
        commit('toggleLoading')
      }).catch((res) => {
        console.log('error!', res)
        commit('toggleLoading')
        commit('error', 'Could not get a response from Olapic')
      })
    },

    getMorePhotos ({dispatch, state}) {
      if (state.links.next && state.links.next.href) {
        dispatch('getPhotos', state.links.next.href)
      }
    },

    submitPhoto ({commit, state}, photo) {
      let photoIndex = state.photos.findIndex(p => p.id === photo.id)
      if (photoIndex > -1) {
        let media = {
          url: photo.images.original,
          caption: photo.caption
        }
        /* eslint-disable no-undef */
        var sdk = new OlapicPartnerSdk()
        if (sdk.sendMedia(media)) {
          commit('photoSubmitted', photoIndex)
        } else {
          commit('error', 'Could not submit the image to the partner app. Please try again or contact support')
        }
      } else {
        commit('error', 'Could not find the image you specified')
      }
    },

    openLightroom ({commit}, photo) {
      commit('openLightroom', photo)
    },

    closeLightroom ({commit}) {
      commit('closeLightroom')
    }
  },

  mutations: {
    error (store, error) {
      store.error = error
    },

    storePhotos (store, photos) {
      store.photos = store.photos.concat(photos)
    },

    storeLinks (store, links) {
      store.links = links
    },

    photoSubmitted (store, index) {
      let photo = Object.assign({}, store.photos[index])
      photo.submitted = true
      console.log(index, photo)
      store.photos.splice(index, 1, photo)
    },

    toggleLoading (store) {
      store.loading = !store.loading
    },

    openLightroom (store, photo) {
      store.lightroom = photo
    },

    closeLightroom (store) {
      store.lightroom = {}
    }
  }
})

