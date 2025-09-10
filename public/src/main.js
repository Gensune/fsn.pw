const App = () => {
  const [url, setUrl] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [isJoy, setIsJoy] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const hostname = window.location.host;

  const createUrl = (e) => {
    e.preventDefault();
    const body = {
      slug: slug,
      url: url
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
        setMsg(result.message);
        setIsJoy(false);
      }else{
        setSlug(result.slug);
        setSuccess(true);
      }
    }).catch(error => {
      setMsg('An error occurred while creating the URL.');
    });
  };

  const resetForm = () => {
    setUrl('');
    setSlug('');
    setSuccess(false);
  }

  if (success) {
    return (
      <div id="success" className="box has-text-centered">
        <p className="is-size-1">Successfully created your URL</p>
        <h2 className="is-size-3"><a href={`/${slug}`}>{hostname}/{slug}</a></h2>
        <a className="button is-medium is-success is-rounded" href="/" onClick={resetForm}>Create New URL</a>
      </div>
    )
  }

  return (
    <main>
      {msg &&
        <article className="message is-danger">
          <div className="message-header">
            <p>Error</p>
            <button id="delete" className="delete" aria-label="delete" onClick={() => setMsg('')}></button>
          </div>
          <div className="message-body">
            {msg}
          </div>
        </article>
      }
      <form id="slugForm" onSubmit={createUrl}>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Enter URL</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input value={url} onChange={(e) => setUrl(e.target.value)} className="input is-large" type="url" placeholder="https://example.com" required />
              </p>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">{hostname}/</label>
          </div>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input value={slug} onChange={(e) => setSlug(e.target.value)} className="input is-large" type="text" placeholder="(This is optional)" />
              </p>
            </div>
          </div>
        </div>
        <div className="short-btn">
          <button type="submit" className="button is-large is-success is-rounded">Shorten Me</button>
        </div>
      </form>
    </main>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);