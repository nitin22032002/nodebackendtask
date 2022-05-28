var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
require("./database/database")
app.use(require("cors")())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/",require("./urls"))

app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.status(500).send("Page Not Found")
  });

module.exports = app;
