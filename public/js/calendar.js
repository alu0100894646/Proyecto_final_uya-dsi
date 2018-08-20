$(function () {

    //Decodificación de la URL a la que le pasamos el usuario para hacer la
    //consulta a la base de datos.
    // console.log('user dentro de la función calendario' + user_.uid);
    var decoded = decodeURIComponent(window.location.search);
    decoded = decoded.substring(1);
    var queries = decoded.split("&");
    queries[0] = queries[0].substring(6);
    

    var user_sin = quitarelpunto(queries[0]);
    console.log(user_sin);

    var connection = new WebSocket('ws://localhost:1337');

    var json_get_events = {
        tipo: 'onopen',
        uid: user_sin
    };

    connection.onopen = function () {
        // connection is opened and ready to use
        connection.send(JSON.stringify(json_get_events));
    };

    connection.onerror = function (error) {
        // an error occurred when sending/receiving data
    };

    var string_eventos = [];
    var event;
    var evento;
    connection.onmessage = function (evento_send) {

        evento = evento_send.data;
        console.log(evento);
        string_eventos.push(evento);
        var eventoParse = JSON.parse(evento);
        //console.log("eventos id "+evento.id)
        event = {
            id: eventoParse.id,
            title: eventoParse.title,
            start: eventoParse.start,
            allDay: eventoParse.allDay
        }
        //console.log(event);
        //string_eventos.push(event);
        //$('#calendar').fullCalendar('renderEvent', event, true);
        console.log("recibido");
    }
    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
     
        editable: true,
        
        eventLimit: true,
        eventLimitText: "m�s",
        selectable: true,
        dayClick: function (date, jsEvent, view) {
            
            var prueba = prompt('Introduza el evento');
            var insert = {
                tipo: 'save_event',
                user: user_sin,
                id: prueba,
                title: prueba,
                start: date,
                allDay: true
            }
            connection.send(JSON.stringify(insert));
            if (prueba != null)
                $('#calendar').fullCalendar('renderEvent', insert, true);

            $(this).css('background-color', 'light blue');
            
        },
        eventClick: function(event) {

            var sel;
            if (confirm("Desea borrar este evento del calendario?\nEvento: " + event.title)) {
                $('#calendar').fullCalendar('removeEvents', event.title);

            }

        },
        events: string_eventos,

        defaultView: 'month',
        // put your options and callbacks here
        loading: function (isLoading,view) {
            if(isLoading)
            for (var i = 0; i < string_evento.length; i++)
                    $('#calendar').fullCalendar('renderEvent', string_eventos[i], true);
            else {
                console.log("Error al cargar los eventos");
            }
        },
    });

});

function quitarelpunto(cadena) {


    return cadena.replace(/\./g, '');

}

function cargameloeventos(aspkmaskma) { //cargaloseventos
    $("calendar").fullCalendar
}