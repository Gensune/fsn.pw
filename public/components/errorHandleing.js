function errorHandler(app){
  app.component('errorBox', {
    data(){
      return {}
    },
    template: `
      <article class="message is-danger">
        <div class="message-header">
          <p>Error</p>
          <button id="delete" class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum ducimus, quibusdam impedit, corrupti asperiores consequatur similique autem aperiam ipsa rerum non amet repellat culpa nisi. Adipisci ipsa fugiat quibusdam rem!
        </div>
      </article>
      `
  });

  return app;
}

export {errorHandler};