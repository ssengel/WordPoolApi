let app = require('./app');
let http = require('http');

let server = http.createServer(app);

server.listen(8080);
