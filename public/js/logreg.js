// Initialize Firebase
/*(function(){
var config = {
  apiKey: "AIzaSyCrRr1EEQNOXhlTNd-3JWd3pCDWS8tTyhU",
  authDomain: "dsi-pfinal.firebaseapp.com",
  databaseURL: "https://dsi-pfinal.firebaseio.com",
  projectId: "dsi-pfinal",
  storageBucket: "dsi-pfinal.appspot.com",
  messagingSenderId: "223396973865"
};
firebase.initializeApp(config);
}());*/

// var rootRef = firebase.database().ref();



firebase.auth().onAuthStateChanged(function(user) {
    if(user)
    {
        window.location = 'calendar.html'; //After successful login, user will be redirected to calendar.html
    }
    else
    {
        console.log('No te has logeado.login');
    }
});



function log_in() {

    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;

    var connection = new WebSocket('ws://localhost:1337');

    if (email === "") {
        alert("Error al escribir el email");
        return false;
    }

    else if (pass === "") {
        alert("Error al escribir la contraseña");
        return false;
    }

    var login_cliente = {
        tipo: 'login',
        email_u: email,
        pass_u: pass
    };

    connection.onopen = function () {
        // connection is opened and ready to use
        connection.send(JSON.stringify(login_cliente));
    };

    connection.onerror = function (error) {
        // an error occurred when sending/receiving data

    };
    connection.onmessage = function (token) {
        var new_token = token.data;

        console.log("He llegado");
        
        firebase.auth().signInWithCustomToken(new_token).catch(function (error) {
            // Handle Errors here.

            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

}
    
function validar_formulario() {

    var nombre = document.getElementById("first_name").value;
    var apellidos = document.getElementById("last_name").value;
    var v_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = document.getElementById("email_reg").value;
    var pass = document.getElementById("password_reg").value;

    var connection = new WebSocket('ws://localhost:1337');

    if (nombre === "") {
        alert("Error al escribir el nombre");
        return false;
    }

    else if (apellidos === "") {
        alert("Error al escribir los apellidos");
        return false;
    }

    else if (!v_email.test(email)) {
        alert("La dirección de e_mail " + email + " no es válida");
    }

    var info_cliente = {
        tipo: "registro",
        nombre_u: nombre,
        apellidos_u: apellidos,
        email_u: email,
        pass_u: pass
    };

    connection.onopen = function () {
        // connection is opened and ready to use
        connection.send(JSON.stringify(info_cliente));
    };

    connection.onerror = function (error) {
        // an error occurred when sending/receiving data

    };

    connection.onmessage = function (token) {
        var new_token = token.data;

        console.log("He llegado");

        firebase.auth().signInWithCustomToken(new_token).catch(function (error) {
            // Handle Errors here.

            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

  
}