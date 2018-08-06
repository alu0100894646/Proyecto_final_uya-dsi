var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(1337, function () { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function (message) {
       
        console.log(message);
        console.log('he recibido un mensaje');
        
    });

    connection.on('close', function (connection) {
        // close user connection
    });
});

//app.use("/public", express.static(path.resolve(__dirname,'../', 'public')));
//app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public/css'));
// app.use(express.static(__dirname + '/public/js'));
// app.use(express.static(__dirname + '/public/img'));
// app.use(express.static(__dirname + '/../css'));
// app.use(express.static(__dirname + '/../js'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
    // res.sendFile(__dirname + '/public/css/materialize.css');
    // res.sendFile(__dirname + '/public/css/style.css');
    //res.sendFile(path.join(__dirname, '../img/', 'study_large_table.jpg'));
})

/*app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, 'materialize.js'));
    res.sendFile(path.join(__dirname, 'init.js'));
})*/

app.listen(port, (err) => {
    if (err) {
        return console.log('Ha ocurrido un error', err);
    }
    console.log(__dirname);
    console.log('Server escuchando en ' + port);
})
