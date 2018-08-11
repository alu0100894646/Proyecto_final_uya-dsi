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
/*var defaultApp = admin.initializeApp({
    credential: admin.credential.cert({
        "project_id": "dsi-pfinal",
        "private_key_id": "c7d80f3fb774cd9231c47d6b4dc063f23d603ef8",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCer9x/vaNJ1pQl\n84CjmCZU5FxYLDFV8cl+IfLvclo2zJyczW8/iE2QBNXl2IYRLCZCiFDytOyccmU0\nz38O6vICNWBs6ouY8yZraYWk4rfc/AFBLpQDCO0FzKUZkYNLeyZzeQwKIx0TgCMn\nflWNX3xmZpCfk+yph3gLJB3+5nIgF9zKNRlasc43FCDLqS9nKVQJ95yCaNCXkxok\nNahSpDRf3pn84kgCW7OEQ5CHczEpGxv0mCliTgaP/jDDXyybgkHnWLry6YxHC/6t\nf0JJg7WIjuyVck2cxQjMGBiFJhYDXJxx+4oT7++8WG4Mn+wuXOYbQmBGQp6aJJti\npLuA9fGfAgMBAAECggEAAYBKiSRyl0CPB3nEaCtUe0bOydzQ3S4yQGTyyKv69mtz\nPjGHBHDzwkp13SwOj26oCpdg7+o9kW863AM3+BMoYYO1ThFGh9Q0t/vsVvLui74j\nI0V+O2Vp9eyjtR0jY+WEAbaspuO/2YRgF96yjxRdKWF95IZW7jypDfEJj8CW/fBq\n/VWSXrFoAOAamhRPT7eXeHwZw9yBwRte2q/FqfEVmYScGhMUPRDipr1Zi2e0OeY3\ntsXmG4tcuuwqhtoeSCIUvkh4USmuQtj5rxSAh56+ElZy+BT9AUXf6KYNJDhMDbw/\nNFlKk04gwG/jQIq93bR90QU1VlMgTIUck16a94h+8QKBgQDYKZYiry41nEsHT8vH\nQm0fJvQfTQXieKyRRGR5ZTkW20HsXZo4qFXv6+PyTeeiT0z8XxFq69AsVf2jCRAw\n8QKDPAyU43dzW8E6kryA7aK93IKAS3wtMMlXhkh6cvqn1RCx8FD0Y+YeGlW1B79Q\nWB5JEd0BcJnuUBdaao2XRZN8aQKBgQC77p21k/pS02td3MlVSmXEFHtlHxkwp48G\nePgFpU5O1f6jTpgVp2cp3ZeNRgthp1oNMJCUyckXPNQT6BNzbwKKgVH1BxS8/C+F\n0kDcAtlm7kDzyQXvV/+MQpm7oOw7MZ0O61rMb+14uiPS+nrzpuac1zUUFrHl2yQf\nyDUxNHbcxwKBgQDAIla8hZFBPabC3P54Imbz5Z/fooq0fiaFCJF2Ba70zfaOrbRC\n3/1iv/1ghjZ5Yps/RxEoRGpIvjYwEAJAPjjJhTp5rKWj986MzZiX0KFyuOmWN4Is\neMy96zHJBSIew5ePUdfjIliMMUQ1IKnANFLXB/W1LezkknPvff5UkxdA4QKBgHcl\ny1spnFUSsUlrB0JJzsdH7QupccEFGoqR+z0pFsKora4/z/A6mA9U7BanR+P7w/4E\nwkVywUk4SYTtaBeRU90YLCva92zxvfdr268hJ1A40Xk+A8NA2UXFm833Mo484ERr\nNr/SXo5iBQBnybfcIu1hC8fWs6b1DqwPtJmjl5BVAoGAfbZB4oYIQglLQnozF8oh\nK42WVEi73QNTKGAQr6/PjdcMKvQIpdbLJZTi33h7ds1w8sxgIjwS9hIxWl7idjQb\nV62H16ZXLkB3U4PeFgAvqUVnQBziB3YFblPxhWnvx3pEQlC79ZCpH9SDL6aINWgc\nUCXyss/f0UbhxIgOmD7Tv04=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-nrdcz@dsi-pfinal.iam.gserviceaccount.com",
        "client_id": "107030671449407450542",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nrdcz%40dsi-pfinal.iam.gserviceaccount.com"
    }),
    databaseURL: "https://dsi-pfinal.firebaseio.com"
});*/

// Initialize the default app
console.log(defaultApp.name);  // '[DEFAULT]'

// Retrieve services via the defaultApp variable...
var defaultAuth = defaultApp.auth();
var defaultDatabase = defaultApp.database();

// ... or use the equivalent shorthand notation
defaultAuth = admin.auth();
defaultDatabase = admin.database();

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
        var userDataPar = JSON.parse(userData);


        var tipo_d = userDataPar.tipo;

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
                contraseña: pass_usuario
            });
           
            TokenPersonalizado(email_usuario, connection);
        }

        else if (tipo_d === 'login') {
            console.log(tipo_d);
            var email_usuario_l = userDataPar.email_u;
            console.log(email_usuario_l);
            var pass_usuario_l = userDataPar.pass_u;
            console.log(pass_usuario_l);


            var db = admin.database();
            var ref = db.ref("server/users");

            // Attach an asynchronous callback to read the data at our posts reference
            ref.orderByChild("Correo_electronico").on("child_added", function (snapshot) {
           
                var correo_electronico = snapshot.val().Correo_electronico;
                var contraseña = snapshot.val().contraseña;
                console.log(correo_electronico);
                console.log(contraseña);
               
                if (correo_electronico === email_usuario_l)
                    if (contraseña === pass_usuario_l) {

                        TokenPersonalizado(email_usuario_l, connection);
                        
                    }
                    }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });



            /*admin.auth().createCustomToken({
                uid: email_usuario_l,
                pass: pass_usuario_l
            })
            .then(function (customToken) {
                // Send token back to client
            })
            .catch(function (error) {
                console.log("Error creating custom token:", error);
            });*/


        }

        /*defaultAuth.createUser({
          uid: email_usuario,
          email: email_usuario,
          password: pass_usuario
        })
        .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
          console.log("Successfully created new user:", userRecord.uid);
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if(errorCode == "auth/weak-password")
            alert("La contraseña es débil.");
          else if(errorCode == "auth/email-already-in-use")
            alert("El correo ya está en uso.");
          else
            console.log("Error creating new user:", error);
        });*/
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