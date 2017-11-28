const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

var request = require("request")
// http://nodejs.org/api.html#_child_processes
var exec = require('child_process').exec;

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

var formattedMockURL = '';
var formatttedSwaggerURL = '';

app.post('/urls', function (req, res) {
    res.send(req.body)
    // replace all '\' with '/'
    formattedMockURL = req.body['mock'].toString().replace(/\\/g, '/');
    formattedSwaggerURL = req.body['swagger'].toString().replace(/\\/g, '/');
    console.log(formattedMockURL, formattedSwaggerURL);
})

app.get('/results', (req, res) => {
    console.log(formattedMockURL, formattedSwaggerURL);
    // executes `pwd`
    var child = exec("swagger-mock-validator " + formattedSwaggerURL + " " + formattedMockURL, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        res.send(stdout);
    });
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Express Server running on localhost:${port}`));