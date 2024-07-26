const http = require('http');
const app = require('../src/server/app');

const port = process.env.PORT || 4444;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);