import { createApp, ref } from './src/vue.esm-browser.js';

const slug = ref('');
const url = ref('');

createApp({
 setup() {
   const createUrl = () => {
     console.log(slug.value, url.value);
   };

   return {
     slug,
     url,
     createUrl
   };
 }
}).mount('#app');