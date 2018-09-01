$(function () {


    var decoded = decodeURIComponent(window.location.search)
    decoded = decoded.substring(1);
    var queries = decoded.split("&");
    queries[0] = queries[0].substring(4);

    var desc = queries[0];
    console.log(desc);
    if (desc === "desconectado") {
        var mensaje = "Te has desconectado correctamente";
        document.getElementById("prueba").innerHTML = mensaje;

    }
})
var new_token;
var socket = io();


firebase.auth().onAuthStateChanged(function(user) {
    if(user)
    {
        window.location.replace('calendar.html?token=' + user.uid); //After successful login, user will be redirected to calendar.html
    }
    else
    {
        console.log('No te has logeado.login');
    }
});


function log_in() {


    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;

    if (email === "") {
        $("#email").addClass("invalid");
        $("#email").prop("aria-invalid", "true");
        return false;
    }

    else if (pass === "") {
        $("#password").addClass("invalid");
        $("#password").prop("aria-invalid", "true");
        return false;
    }

    var login_cliente = {
        tipo: 'login',
        email_u: email,
        pass_u: pass
    };

    socket.emit('login', login_cliente);

    socket.on('customToken', function (token) {

        firebase.auth().signInWithCustomToken(token).catch(function (error) {

            var errorCode = error.code;
            var errorMessage = error.message;

        });
    });
    socket.on('errorLogin', function () {

        var mensaje = "El email o contraseña no son correctos";
        document.getElementById("prueba").innerHTML = mensaje;
        return mensaje;
    });
}

function validar_formulario() {

    var nombre = document.getElementById("first_name").value;
    var apellidos = document.getElementById("last_name").value;
    var v_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var email = document.getElementById("email_reg").value;
    var email_c = document.getElementById("email-confirm").value;
    var pass = document.getElementById("password_reg").value;
    var pass_c = document.getElementById("password-confirm").value;

    if (nombre === "") {
       
        $("#first_name").addClass("invalid");
        $("#first_name").prop("aria-invalid", "true");
        return false;
    }

    else if (apellidos === "") {
        $("#last_name").addClass("invalid");
        $("#last_name").prop("aria-invalid", "true");
        return false;
    }

    else if (email === "") {
        $("#email_reg").addClass("invalid");
        $("#email_reg").prop("aria-invalid", "true");
        return false;
    }
    else if (email != email_c) {
        $("#email-confirm").addClass("invalid");
        $("#email-confirm").prop("aria-invalid", "true");

        return false;
    }

    else if (!v_email.test(email)) {
        //alert("La dirección de e_mail " + email + " no es válida");
        return false
    }

    else if (pass === "") {
        $("#password_reg").addClass("invalid");
        $("#password_reg").prop("aria-invalid", "true");
        return false;

    }
    else if (pass != pass_c) {

        $("#password-confirm").addClass("invalid");
        $("#password-confirm").prop("aria-invalid", "true");
        return false;
    }

    var info_cliente = {
        tipo: "registro",
        nombre_u: nombre,
        apellidos_u: apellidos,
        email_u: email,
        pass_u: pass
    };

    socket.emit('registro', info_cliente);

    socket.on('customToken', function (token) {
        firebase.auth().signInWithCustomToken(token).catch(function (error) {
                // Handle Errors here.

            var errorCode = error.code;
            var errorMessage = error.message;
                // ...
        });
    });
}
