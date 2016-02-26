//test.js
/*
Radhika Mattoo, rm3485@nyu.edu
Applied Internet Tech Spring 2016
Homework 3
*/

// setup
var express = require('express');
var app = express();

var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


//index
app.get('/', function(req, res){
	res.render('index',{'header': req.headers});
});

//about
app.get('/about', function(req, res){

	res.render('about');
});

//404
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

// app.get('/faq', function(req, res) {
// 	res.send('you has q, i has answer');
// });

app.listen(3000);
console.log('Started server on port 3000');
