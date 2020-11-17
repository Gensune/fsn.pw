require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const urls = require('./db/urls');

const app = express();
const port = process.env.PORT || 1337;

// Set Content Security Policies
const scriptSources = ["'strict-dynamic'","'nonce-ptRfcq'","'unsafe-inline'","'unsafe-eval'","'self'"];
const styleSources = ["fonts.googleapis.com","'nonce-EqI99P'","'self'"];
const connectSources = ["'self'"];

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
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
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

app.use((error, req, res, next) => {
  if(error.status){
    res.status(error.status);
  } else {
    res.status(500);
  }
  console.log(error);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  console.log(urls);
});
