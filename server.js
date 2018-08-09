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

        var userData = message.utf8Data;
        console.log(userData);

        // var userData = JSON.parse(message.data);
        // var nombre_usuario = userData[0].nombre_u;
        // console.log(nombre_usuario);

//         var userdata = JSON.parse(data);
// var user1_name = userdata[0].name;
// var user1_age = userdata[0].age;
// var user2_name = userdata[1].name;
// var user2_age = userdata[1].age;
// data = '[{"name" : "John Doe", "age" : "25"},{"name" : "Jane Doe", "age" : "20"}]';






        // firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error){
        //     //handle erros here
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     if(errorCode == "auth/weak-password")
        //       alert("La contraseña es débil.");
        //     else if(errorCode == "auth/email-already-in-use")
        //       alert("El correo ya está en uso.");
        //     else
        //         alert(errorMessage);
        //     alert('Hola estoy creando un usuario');
        // });

    });

    connection.on('close', function (connection) {
        // close user connection
    });
});

//app.use("/public", express.static(path.resolve(__dirname,'../', 'public')));
//app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(port, (err) => {
    if (err) {
        return console.log('Ha ocurrido un error', err);
    }
    console.log(__dirname);
    console.log('Server escuchando en ' + port);
})
