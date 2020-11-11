import { createApp, ref } from './src/vue.esm-browser.js';

const slug = ref('');
const url = ref('');

createApp({
  setup() {
    const createUrl = () => {
      const body = {
        slug: this.slug.value,
        url: this.url.value
      };

      fetch('/api/slug', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => {
        console.log(response);
        return response.json();
      }).then(result => {
        console.log(result);
      });
    };

    return {
      slug,
      url,
      createUrl
    };
  }
}).mount('#app');