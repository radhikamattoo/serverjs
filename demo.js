//demo.js
/*
Radhika Mattoo, rm3485@nyu.edu
Applied Internet Tech Spring 2016
Homework 3
*/
var http = require('http');
fs = require('fs');
var port = 3000;
var date = new Date();

//for path parsing
var clear = false;
var replace = "";

//for logging
var printString = "";


http.createServer(handleRequest).listen(port);
console.log('starting server on ' + port);


function handleRequest(req, res) {
  //for logging all requests
  printString = date.toLocaleString() + " GET " + req.url + " ";
  //trailing slash? make sure req.url directory isn't messed up
  if(req.url.substring(req.url.length-1) === '/'){
    clear = true;
    replace = req.url.toLowerCase();
  }

  //clean up path name
  var path =  req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

  //make sure to fix path if there was a trailing slash in the request's URL
  if(clear){
    path = path.replace(replace, '/');
  }

  //use switch case to determine what parameters to pass to servestatic
  switch(path){
    case '/home':
    case '':
    case '/':
      res.statusMessage = "OK";
      serveStatic(res, '/public/index.html', 'text/html', 200);
      break;
    case '/me':
      res.statusMessage = "Moved Permanently";
      res.writeHead(301, {'Location': '/about'});
      //log request here since we don't call serveStatic for '/me'
      console.log(printString + res.statusCode + " " + res.statusMessage);
      res.end();
      break;
    case '/about':
      res.statusMessage = "OK";
      serveStatic(res, '/public/about.html', 'text/html', 200);
      break;
    case '/css/base.css':
      res.statusMessage = "OK";
      serveStatic(res, '/public/css/base.css', 'text/css', 200);
      break;
    case '/img/image1.png':
      res.statusMessage = "OK";
      serveStatic(res, '/public/img/image1.png', 'image/png', 200);
      break;
    case '/img/image2.png':
      res.statusMessage = "OK";
      serveStatic(res, '/public/img/image2.png', 'image/png', 200);
      break;
    default:
      res.statusMessage = "Not Found";
      serveStatic(res, '/public/404.html', 'text/html', 404);
      break;
  }
}

function serveStatic(res, path, contentType, resCode) {
	fs.readFile(__dirname + path, function(err, data) { //callback function
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
      console.log(printString + 500 + " Server Error ");
			res.end(path);
		} else {
			res.writeHead(resCode, { 'Content-Type': contentType });
      //log every request
      console.log(printString + res.statusCode + " " + res.statusMessage);
			res.end(data);
		}
	});

}
