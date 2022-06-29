const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const helmet = require('helmet')
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./docs/swagger.json");

const options = require('./knexfile.js');
const knex = require('knex')(options); 

const usersRouter = require('./routes/users');
const countriesRouter = require('./routes/countries');
const adminRouter = require('./routes/admin');
const volcanoRouter = require('./routes/volcano');
const volcanoesRouter = require('./routes/volcanoes');

const app = express();

app.use(helmet())

app.use((req, res, next) => {
  req.db = knex
  next()
}) 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('common'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", swaggerUi.serve);
app.get(
  "/",
  swaggerUi.setup(swaggerDoc, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  })
);
app.use('/user', usersRouter);
app.use('/countries', countriesRouter);
app.use('/volcanoes', volcanoesRouter);
app.use('/volcano', volcanoRouter);
app.use('/me', adminRouter);

// catch 404 and forward to error handler
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
  res.render('error');
});

module.exports = app;
