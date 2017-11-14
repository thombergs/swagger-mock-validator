const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

var readline = require('readline');
var cp = require('child_process');
var tail = cp.spawn('tail', ['-500', 'mylogfile.log']);
var lineReader = readline.createInterface(tail.stdout, tail.stdin);

lineReader.on('line', function(line) {
	console.log('Line: ' + line);
});

tail.on('close', function(code, signal) {
	console.log('ls finished...');
});

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));