var express = require('express');
var app = express();
var path = require('path');
var port = 3000;
//import firebase from 'firebase'

//Parte de la autenticación del SDK
var admin = require("firebase-admin");

var serviceAccount = require('./dsi-pfinal-firebase-adminsdk-nrdcz-c7d80f3fb7.json');


var defaultApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dsi-pfinal.firebaseio.com"
});

// Initialize the default app
console.log(defaultApp.name);  // '[DEFAULT]'

// Retrieve services via the defaultApp variable...
var defaultAuth = defaultApp.auth();
var defaultDatabase = defaultApp.database();

/*// ... or use the equivalent shorthand notation
defaultAuth = admin.auth();
defaultDatabase = admin.database();*/

var WebSocketServer = require('websocket').server;
var http = require('http');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log('Ha ocurrido un error', err);
    }
    console.log(__dirname);
    console.log('Server escuchando en ' + process.env.PORT);
})

var server = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(port);

// create the server
wsServer = new WebSocketServer({server});

// WebSocket server
wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function (message) {

        //El servidor recibe un mensaje del cliente
        console.log(message);
        console.log('he recibido un mensaje');

        var userData = message.utf8Data;
        var userDataPar = JSON.parse(userData);


        var tipo_d = userDataPar.tipo;
        //Un JSON utilizado para registrar el usuario en el servidor
        if (tipo_d === 'registro') {
            console.log(tipo_d);
            var nombre_usuario = userDataPar.nombre_u;
            console.log(nombre_usuario);
            var apellidos_usuario = userDataPar.apellidos_u;
            console.log(apellidos_usuario);
            var email_usuario = userDataPar.email_u;
            console.log(email_usuario);
            var pass_usuario = userDataPar.pass_u;
            console.log(pass_usuario);

            defaultAuth.createUser({
                uid: email_usuario,
                email: email_usuario,
                password: pass_usuario
            })
        .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);

        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/weak-password")
                alert("La contraseña es débil.");
            else if (errorCode == "auth/email-already-in-use")
                alert("El correo ya está en uso.");
            else
                console.log("Error creating new user:", error);
        });

            var db = admin.database();
           // var ref = db.ref("server/saving-data/fireblog");

            var sin = quitarelpunto(email_usuario);
            //var usersRef = ref.child("users");
            console.log(" sin: " + sin);
            db.ref('server/users/' + sin).set({
                Apellidos: apellidos_usuario,
                Correo_electronico: email_usuario,
                Nombre: nombre_usuario,
                Contraseña: pass_usuario
            });

            TokenPersonalizado(email_usuario, connection);
        }
        //El JSON correspondiente al Login
        else if (tipo_d === 'login') {
            console.log(tipo_d);
            var email_usuario_l = userDataPar.email_u;
            console.log(email_usuario_l);
            var pass_usuario_l = userDataPar.pass_u;
            console.log(pass_usuario_l);
            console.log('--------------------------');


            var db = admin.database();
            var ref = db.ref("server/users");

            // Attach an asynchronous callback to read the data at our posts reference
            ref.orderByChild("Correo_electronico").on("child_added", function (snapshot) {

                var correo_electronico = snapshot.val().Correo_electronico;
                var contraseña = snapshot.val().Contraseña;
                console.log(correo_electronico);
                console.log(contraseña);

                if (correo_electronico === email_usuario_l)
                    if (contraseña === pass_usuario_l) {

                        TokenPersonalizado(email_usuario_l, connection);

                    }
                    }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });



        }
        //Request para guardar un evento de un usuario en el servidor
        else if (tipo_d === 'save_event')
        {
            var id = userDataPar.id;
            var title = userDataPar.title;
            var start = userDataPar.start;
            var user = userDataPar.user;
            console.log("ID: " + id + " title " + title + " start " + start);

            //Guardando el evento en el servidor

            var db = admin.database();

            db.ref('server/events/' + user).push({
                id: id,
                title: title,
                start: start,
                allDay: true,
            });
        }
        //Petición del cliente para cargar todos los eventos del usuario al conectarse
        else if (tipo_d === 'onopen')
        {
            var uid = userDataPar.uid;
            console.log("en el onopen " + uid);
            var db = admin.database();
            var ref = db.ref("server/events/" + uid);

            ref.on("child_added", function (snapshot) {
                console.log(snapshot.val().id);
                var id = snapshot.val().id;
                var title = snapshot.val().title;
                var start = snapshot.val().start;
                var allDay = snapshot.val().allDay;
                console.log("id " + id);
                var evento_send = {
                    id: id,
                    title: title,
                    start: start,
                    allDay: allDay
                }
                connection.send(JSON.stringify(evento_send));

            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            })


        }
        //Petición del cliente para borrar un evento de la base de datos en el calendario
        else if (tipo_d === "borrar") {

            var title = userDataPar.title;
            var id = userDataPar.id;
            var uid = userDataPar.uid;
            var db = admin.database();
            var ref = db.ref("server/events/" + uid);
            console.log("evento que se va a borrar: " + title +" " + uid);
            ref.orderByChild("id").on("child_added", function (snapshot){

                console.log("titulo " + snapshot.val().title);
                if (snapshot.val().title === title) {
                    snapshot.ref.remove();
                }
            })
        };

    });

    connection.on('close', function (connection) {
        // close user connection
    });
});



function TokenPersonalizado(uid, connection) {

    admin.auth().createCustomToken(uid).then(function (customToken) {
        // Send token back to client

        connection.send(customToken);

    })
.catch(function (error) {
    console.log("Error creating custom token:", error);
});
}

function quitarelpunto(cadena) {


    return cadena.replace(/\./g,'');

}
