'use strict'

const express = require('express'),
  logger = require('morgan'),
  app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/index'));
app.use('/email', require('./routes/email'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(`[ERROR] ${err}`);

  // send the error status
  res.sendStatus(err.status || 500);
});

module.exports = app;
