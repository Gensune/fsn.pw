import { config } from './config.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import * as crypto from "node:crypto";
import { promises as fs } from 'fs';
import path from 'path';

import urls from './db/urls.js';

const app = express();
const port = config.port;

// Set Content Security Policies

app.use((_req, res, next) => {
  // Asynchronously generate a unique nonce for each request.
  crypto.randomBytes(32, (err, randomBytes) => {
    if (err) {
      // If there was a problem, bail.
      next(err);
    } else {
      // Save the nonce, as a hex string, to `res.locals` for later.
      res.locals.cspNonce = randomBytes.toString("hex");
      next();
    }
  });
});

const scriptSources = ["'strict-dynamic'",(_req, res) => `'nonce-${res.locals.cspNonce}'`,"'unsafe-inline'","'unsafe-eval'","'self'"];
const styleSources = ["fonts.googleapis.com",(_req, res) => `'nonce-${res.locals.cspNonce}'`,"'self'"];
const connectSources = ["'self'", "jenil.github.io"];

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: scriptSources,
      scriptSrcElem: scriptSources,
      styleSrc: styleSources,
      fontSrc: ["fonts.gstatic.com"],
      connectSrc: connectSources
    },
  })
);
// app.use(helmet({
//   contentSecurityPolicy: false,
// }));
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.get("/", async (_req, res, next) => {
  try {
    const indexPath = path.join(process.cwd(), 'public', 'index.html');
    let indexHtml = await fs.readFile(indexPath, 'utf-8');

    const headContent = `
    <link rel="stylesheet" href="https://jenil.github.io/bulmaswatch/nuclear/bulmaswatch.min.css" nonce="${res.locals.cspNonce}">
    <link rel="stylesheet" href="./style.css" nonce="${res.locals.cspNonce}">
    `;

    const bodyContent = `
    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin nonce="${res.locals.cspNonce}"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin nonce="${res.locals.cspNonce}"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js" nonce="${res.locals.cspNonce}"></script>
    <script type="text/babel" src="./src/main.js" nonce="${res.locals.cspNonce}"></script>
    `;

    indexHtml = indexHtml.replace('</head>', `${headContent}</head>`);
    indexHtml = indexHtml.replace('</body>', `${bodyContent}</body>`);

    res.send(indexHtml);
  } catch (error) {
    next(error);
  }
});

app.use(express.static('./public'));

app.post('/api/slug', async (req, res, next)=>{
  //Create a short url
  try {
    const url = await urls.create(req.body);
    if(url === null){
      throw new Error('Slug in use. Try another one.');
    }
    res.json(url);
  } catch (error) {
    next(error);
  }
});

app.get('/favicon.ico', (req, res) => res.status(204).send());

app.get('/:short', async (req, res, next) =>{
  const short = req.params.short;

  try {
    const url = await urls.getURL(short);
    if(url === null){
      res.redirect('https://127.0.0.1');
    }else{
      res.redirect(url);
    }
  }catch (error){
    next(error);
  }
});

app.use((error, req, res, next) => {
  if(error.status){
    res.status(error.status);
  } else {
    res.status(500);
  }
  console.log(error);
  res.json({
    message: error.message,
    stack: config.env === 'production' ? '🥞' : error.stack,
  });
});

app.listen(config.port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
