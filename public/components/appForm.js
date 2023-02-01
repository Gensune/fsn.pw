function appForm(app){
  app.component('createSlug', {
    props: ['slug','url'],
    templete: `
      <form id="slugForm" class="show" @submit.prevent="createUrl">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Enter URL</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input v-model="url" class="input is-large" type="url" placeholder="https://example.com" required>
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">fsn.pw/</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input v-model="slug" class="input is-large" type="text" placeholder="(This is optional)">
              </p>
            </div>
          </div>
        </div>
        <div class="short-btn">
          <button type="submit" class="button is-large is-success is-rounded">Shorten Me</button>
        </div>
      </form>
    `,
    computed: {
      get(){
        return this.slug, this.url;
      }
    }
  });

  return app;
}

export {appForm};