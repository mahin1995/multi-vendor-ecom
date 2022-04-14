const express = require('express');
const cors  = require('cors');
const { customer, products, shopping } = require('./api');
const HandleErrors = require('./utils/error-handler')
var {home_view,products_view,users_view} = require('./routes');

module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

// views
app.use('/home', home_view);
app.use('/users-views',users_view );
app.use('/product-views',products_view );
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

    //api
    customer(app);
    products(app);
    shopping(app);

    // error handling
    app.use(HandleErrors);
    
}