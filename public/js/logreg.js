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



function log_in(){

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

