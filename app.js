// [START setup]
const express = require('express');
const bodyParser = require('body-parser');

const Routes = require('./routes');

const app = express();

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
