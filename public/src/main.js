import * as Vue from './vue.esm-browser.js';

const errorButton = document.getElementById('delete');
const article = document.querySelector('article');

const slug = Vue.ref('');
const url = Vue.ref('');
let msg = Vue.ref('');
let isJoy = Vue.ref('false');

const showHide = () => {
  const form = document.getElementById('slugForm');
  const div = document.getElementById('success');

  form.classList.toggle('hide');
  div.classList.toggle('hide');
};

const App = {
  setup() {
    const createUrl = () => {
      const body = {
        slug: slug.value,
        url: url.value
      };

      fetch('/api/slug', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => {
        return response.json();
      }).then(result => {
        if(result.stack){
          msg.value = result.message;
          article.classList.remove('hide');
          isJoy = false;
          console.log(isJoy);
        }else{
          if(!isJoy){
            isJoy = true;
            article.classList.add('hide');
          }
          slug.value = result.slug;
          showHide();
        }
      });
    };

    return {
      slug,
      url,
      msg,
      isJoy,
      createUrl
    };
  }
};

let app = Vue.createApp(App);

app.mount('#app');


errorButton.addEventListener('click', () => {
  article.classList.add('hide');
})