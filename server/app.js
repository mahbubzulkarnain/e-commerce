if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('mongoose')
  .connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/ecommerce_test', {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then((prop) => {
    console.log(`${process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/ecommerce_test'} => ${prop.connection.name} connected, port ${prop.connection.port}.`)
  })
  .catch((err) => {
    console.error(err)
  });

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app
  .use('/auth', require('./routes/auth'))
  .use('/products', require('./routes/products'))
  .use('/carts', require('./routes/carts'))
  .use('/', require('./routes/index'));

module.exports = app;
