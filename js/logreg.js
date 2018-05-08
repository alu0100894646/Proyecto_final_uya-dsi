// Initialize Firebase
var config = {
  apiKey: "AIzaSyCrRr1EEQNOXhlTNd-3JWd3pCDWS8tTyhU",
  authDomain: "dsi-pfinal.firebaseapp.com",
  databaseURL: "https://dsi-pfinal.firebaseio.com",
  projectId: "dsi-pfinal",
  storageBucket: "dsi-pfinal.appspot.com",
  messagingSenderId: "223396973865"
};
firebase.initializeApp(config);

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
  });
};
