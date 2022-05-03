import Vue from 'vue'
import {debounce} from 'lodash'

Vue.config.productionTip = false

new Vue({
  el: '#message-box',
  data: {
    input: '🐲',
  },
  computed: {
    message: function () {
      return this.input
    },
  },
  methods: {
    update: debounce(function (e) {
      this.input = e.target.value
    }, 300),
  },
})
