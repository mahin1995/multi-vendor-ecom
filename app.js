var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session')
const cors  = require('cors');
const expressApp = require('./src/express-app');
const { databaseConnection } = require('./src/database');
const MongoDBSession = require('connect-mongodb-session')(session)


var app = express();
const StartServer = async() => {

  await databaseConnection();
  
  await expressApp(app);
  
}
const store= MongoDBSession({
  uri:process.env.MONGODB_URI,
  collection:"mySession"
})

StartServer()

app.use(express.static(path.join(__dirname, '/public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({ limit: '1mb'}));
app.use(express.urlencoded({ extended: true, limit: '1mb'}));
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret:process.env.APP_SECRET,
  resave:false,
  saveUninitialized:false,
  store:store
}))


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
