//getting dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var multer = require('multer');


//new deps
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var session = require('express-session');

//database config
var configDB = require('./config/database');
var configPP = require('./config/passport');

//getroutes
var index = require('./routes/index');
var users = require('./routes/users');
var todos = require('./routes/todos');


var login = require('./routes/login');
var signup = require('./routes/signup');
var logout = require('./routes/logout');
var fileUpload = require('./routes/fileUpload');
var profile = require('./routes/profile');
var upload = multer({dest:'uploads/'});

var cpUpload = upload.single('postImg')

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: false,
  uploadDir:'./uploads'
 }));
//app.use(multer({dest:'./uploads/'}).single(thumbnail));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.methodOverride());
app.use(bodyParser({keepExtensions:true,uploadDir:path.join(__dirname,'/files')}));

//app.use(express.bodyParser({uploadDir: './uploads'}));

app.use(session({ secret: 'ilovemtlcollege' })); //session secret
app.use(passport.initialize());
app.use(passport.session()); //persistant login session


//endpoints

app.use('/', index);

app.use('/todos', todos);
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/fileUpload', fileUpload);
app.use('/profile', profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


console.log("testing again");

mongoose.connect(configDB.url,function(err){
  if(err){
    console.log("There was an error: ", err);
  }
  else {
    console.log("Connection to mongo successful.");
  }
});

module.exports = app;
