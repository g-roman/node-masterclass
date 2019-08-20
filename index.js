const http = require('http');
const url = require('url');

const handlers = {
	'hello': (cb) => cb(200, {'hello': 'world'}),
	'notFound': (cb) => cb(404)
};

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const path = parsedUrl.pathname;
	const trimmedPath = path.replace(/^\/+|\/+$/g, '');
	const handler = (trimmedPath in handlers) ? handlers[trimmedPath] : handlers.notFound;
	
	handler((statusCode, body) => {
		res.setHeader('Content-Type', 'application/json');
		res.writeHead(statusCode);
		res.end(JSON.stringify(body));
	})	
});

server.listen(3000);
