const mongoose = require('mongoose');

const dbHelper = {
  mongoDbConnection: null,

  // connect to database
  intitialse: async configParam => {
    const options = {
      dbName: configParam.databaseName,
      user: configParam.userName,
      pass: configParam.password,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
    console.log('Initialise MongoDb Connection');
    try {
      await mongoose.connect(configParam.server, options);
      dbHelper.mongoDbConnection = mongoose.connection;
      console.log('Connected to ' + configParam.server)
    } catch (err) {
      // dbHelper.mongoDbConnection.close();
      console.log('Mongoose connection error: ' + err);
      throw err;
    }
  }
}

module.exports = {
  dbHelper
}
