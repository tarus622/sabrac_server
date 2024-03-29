const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoDbConnection = require('./database/db');
require('dotenv').config();

async function initializeApp() {
  try {
    // Connect to MongoDB
    await mongoDbConnection();

    // Create Express app
    const app = express();

    // view engine setup
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', require('./routes/index'));
    app.use('/users', require('./routes/users'));

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500).send(error.message);
    });

    return app;
  } catch (error) {
    console.error('Error during initialization:', error);
    // Handle initialization error (e.g., exit the application)
    process.exit(1);
  }
}

module.exports = initializeApp;