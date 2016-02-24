//demo.js
var http = require('http');
fs = require('fs');
var port = 3000;
var date = new Date();

http.createServer(handleRequest).listen(port);
console.log('starting server on ' + port);


function handleRequest(req, res) {
  //clean up path name
	var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

  //use switch case to determine what parameters to pass to servestatic
  console.log(date.toLocaleString() + " " + req.method + " " + req.url + " " + res.statusCode);
  switch(path){
    case '/home':
    case '/': //FIXME
      serveStatic(res, '/public/index.html', 'text/html', 200);
      break;
    case '/about':
      serveStatic(res, '/public/about.html', 'text/html', 200);
      break;
    case 'me':
      res.writeHead(301, {'Location' : '/public/about.html'}); //FIXME
      serveStatic(res, '/public/about.html', 'text/html', 200);
      break;
    case '/css/base.css':
      serveStatic(res, '/public/css/base.css', 'text/css', 200);
      break;
    case '/img/image1.png':
      serveStatic(res, '/public/img/image1.png', 'image/png', 200);
      break;
    case '/img/image2.png':
      serveStatic(res, '/public/img/image2.png', 'image/png', 200);
      break;
    default:
      serveStatic(res, '/public/404.html', 'text/html', 404);
  }
}

function serveStatic(res, path, contentType, resCode) {
	fs.readFile(__dirname + path, function(err, data) { //callback function
		if (err) {
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end(path);
		} else {
			res.writeHead(resCode, { 'Content-Type': contentType });
			res.end(data);
		}
	});
}
