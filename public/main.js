import * as Vue from './src/vue.esm-browser.js';

const App = Vue.createApp({
  data() {
    return {
      slug,
      url
    }
  },
  methods: {
    createUrl() {
      console.log(this.slug, this.url);
    }
  }
}).mount('#app');