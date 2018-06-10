'use strict';

// [START setup]
const express = require('express');
const bodyParser = require('body-parser');

const BlogAll = require('./blog-all');

const app = express();

app.set('case sensitive routing', true);
app.use(bodyParser.json());
// [END setup]

app.get('/blog', (req, res) => {
  BlogAll(res);
});

if (module === require.main) {
  // [START listen]
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
  // [END listen]
}
// [END app]

module.exports = app;
