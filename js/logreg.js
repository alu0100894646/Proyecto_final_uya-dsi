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

function log_in(){

    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email,pass).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        if(errorCode == "auth/invalid-email")
            alert("El email"+email+"No es válido");
        else if(errorCode == "auth/user-disabled")
            alert("El email"+email+"esta desabilitado");
        else if(errorCode == "auth/user-not-found")
            alert("No existe un usuario con ese email");
        else if(errorCode == "auth/wrong-password")
            alert("La constraseña proporcionada no es la correcta");
        else
            console.log("Funciona");
        console.log(error + " hola");
    });
    firebase.auth().onAuthStateChanged(email => {
      if(email)
      {
        window.location = 'calendar.html'; //After successful login, user will be redirected to home.html
      }
      else
      {
        console.log('No te has logeado.login');
      }
    });
}

function validar_formulario(){

  var nombre = document.getElementById("first_name").value;
  var apellidos = document.getElementById("last_name").value;
  var v_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var email = document.getElementById("email_reg").value;
  var pass = document.getElementById("password_reg").value;

  if(nombre === ""){
    alert("Error al escribir el nombre");
    return false;
  }

  else if(apellidos === ""){
    alert("Error al escribir los apellidos");
    return false;
  }

   else if (!v_email.test(email)){
    alert("La dirección de e_mail " + email + " no es válida");
  }

  firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error){
      //handle erros here
      var errorCode = error.code;
      var errorMessage = error.message;
      if(errorCode == "auth/weak-password")
        alert("La contraseña es débil.");
      else if(errorCode == "auth/email-already-in-use")
        alert("El correo ya está en uso.");
      else
          alert(errorMessage);
      console.log('Hola estoy creando un usuario');
  });

  firebase.auth().onAuthStateChanged(email => {
  if (email)
  {
    window.location = 'calendar.html'; //After successful login, user will be redirected to home.html
  }
    else
    {
      console.log('No te has logeado.validarusuario');
    }
  });

};
