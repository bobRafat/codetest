var express = require('express');
var bodyparser = require('body-parser');
var app = new express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

const mainRouter= require('./routes/main');

app.use('/',mainRouter);

app.listen(process.env.PORT || 80, function(){
    console.log(`app is listening on port 5000`);
});

module.exports = app;