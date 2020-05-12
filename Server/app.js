var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ex = require("./tools/components/Exception")
var api = "/api/v1/server";


/*
const analizer = require("./controller/AnalizerController");

var a = new analizer();

const lexer = require("./tools/grammar");

var tree = lexer.parse("import a; class a { if (num1 > num2){ int a = 0; int b= 0; } else if(a) { int C = 0; } else{ int e = 0; } }");



tree.instructions[0].list.forEach(element => {
  console.log(element)
  if(element.name == "If"){
    
    a.armarExcepciones(element.list)
    a.armarExcepciones(element.ElseList)
    
  }
});*/



//QUE INSTALAR
//npm install jison
//npm install jison-lex

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(api, indexRouter);
app.use('/users', usersRouter);



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



/**
 * CORS ACCESS
 */
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if (req.methods == "OPTIONS") {
      res.sendStatus(200);
  } else {
      next();
  }
});

/**
 * BODY PARSER
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


module.exports = app;
