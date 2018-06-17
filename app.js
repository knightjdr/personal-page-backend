// [START setup]
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const Routes = require('./routes');

const app = express();

// enable cors.
const urls = process.env.NODE_ENV === 'production' ?
  ['https://jamesknight.ca', 'https://knightjdr.github.io']
  :
  ['http://localhost:3000'];
app.use(cors({
  origin: urls,
  optionsSuccessStatus: 204,
  preflightContinue: true,
}));

app.set('case sensitive routing', true);
app.use(bodyParser.json());
// [END setup]

Routes.configure(app);

if (module === require.main) {
  // [START listen]
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
  // [END listen]
}
// [END app]

module.exports = app;
