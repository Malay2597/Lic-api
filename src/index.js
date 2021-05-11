const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const config = require('config');
const { dbHelper } = require('./helpers/dbHelper');

const app = express();

// Add middleware
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

(async () => {
  // Create connection
  await dbHelper.intitialse(config.mongoConnection);
  // Register routes
  try {
    routes.init(app);
  } catch (err) {
    console.log(err + 'error')
  }

  const appStartedCallback = () => {
    console.log(`Server listening on port ${config.expressPort}`);
  };

  // Start app
  const server = app.listen(process.env.PORT || config.expressPort, appStartedCallback);
  server.setTimeout(3720000); // 1hr and 2mins
})();