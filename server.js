//Server

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const createError = require('http-errors');

const app = express();

// define router middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const name = 'api.betting_platform.local';
const port = 5000;

const baseURL = '/api';

app.use(`${baseURL}`, router);



// Test

function test(req, res, next) {
  res.status(200).json({ data: { test:'test' } });
}

router.get('/test', test);


// Express error handlers

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // check if this error is anticipated already
  if (err.expose === undefined) {
    const httpErr = createError(500);
    res.status(httpErr.status).json({ error: httpErr.message });
  } else {
    res.status(err.status).json({ error: err });
  }
});

app.listen(port, () => console.log(`${name} listening on port ${port}`));
