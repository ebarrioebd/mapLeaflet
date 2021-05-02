const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//mongoose.connect('mongodb+srv://ebarriosebd:awYo0bsX5UoTguf7@leaflet.kcui8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');//mongodb://localhost/nodejs-mapv3
/*mongoose
  .connect('mongodb+srv://ebarriosebd:awYo0bsX5UoTguf7@leaflet.kcui8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });*/

const MongoClient = require("mongodb").MongoClient;
const uri =process.env.MONGO_SRV
MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
  if (err) { 
    console.log("Error occurred connecting to MongoDB..."+err); 
  }
  console.log("Connected to MongoDB!");
});
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const index = require('./routes/index');
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(8080, () => {
  console.log("server running port 8080")
})

module.exports = app;
