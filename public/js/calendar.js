
var user_;


$(function () {

 
   // console.log('user dentro de la función calendario' + user_.uid);
    var decoded = decodeURIComponent(window.location.search);
    decoded = decoded.substring(1);
    var queries = decoded.split("&");
    queries[0] = queries[0].substring(6);
    

    var user_sin = quitarelpunto(queries[0]);
    console.log(user_sin);
    
    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({

        editable: true,

        eventLimit: true,
        eventLimitText: "m�s",
        selectable: true,
        dayClick: function (date, jsEvent, view) {
            var prueba = prompt('Introduza el evento');
            if (prueba != null)
                $('#calendar').fullCalendar('renderEvent', {

                    id: prueba,
                    title: prueba,
                    start: date,
                    allDay: true
                }, true);



            $(this).css('background-color', 'light blue');

        },
        eventClick: function(event) {

            var sel;
            if (confirm("Desea borrar este evento del calendario?\nEvento: " + event.title)) {


                $('#calendar').fullCalendar('removeEvents', event.title);

                }



        },




        defaultView: 'month'
        // put your options and callbacks here


    });





});


/*firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        user_ = user;
        console.log('Sesion inciada');
        console.log('usuario calendario: ' + user_.uid);
    }
    else {
        console.log('Sesion no iniciada');
    }
});*/

function quitarelpunto(cadena) {


    return cadena.replace(/\./g, '');

}

/*var time;
var day;
var month;
var year;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var center;

// remove border if the selected date is today's date
function todayEqualActive(){
  setTimeout(function(){
    if($(".ui-datepicker-current-day").hasClass("ui-datepicker-today")){
      $(".ui-datepicker-today")
        .children(".ui-state-default")
        .css("border-bottom", "0");
    }
    else{
      $(".ui-datepicker-today")
        .children(".ui-state-default")
        .css("border-bottom", "2px solid rgba(53,60,66,0.5)");
    }
  }, 20);
}

// call the above function on document ready
todayEqualActive();

$('#calendar').datepicker({
  inline: true,
  firstDay: 1,
  showOtherMonths: true,
  onChangeMonthYear: function(){
    todayEqualActive();
  },
  onSelect: function(dateText, inst){
    var date = $(this).datepicker('getDate'),
    day  = date.getDate(),
    month = date.getMonth() + 1,
    year =  date.getFullYear();

    // display day and month on submit button
    var monthName = months[month - 1];
    $(".request .day").text(monthName + " " + day);

    todayEqualActive();

    $(".request").removeClass("disabled");

    var index;

    setTimeout(function(){
       $(".ui-datepicker-calendar tbody tr").each(function(){
        if($(this).find(".ui-datepicker-current-day").length){
          index = $(this).index() + 1;
        }
      });

      // insert timepiker placeholder after selected row
      $("<tr class='timepicker-cf'></tr>")
          .insertAfter($(".ui-datepicker-calendar tr")
          .eq(index));

      var top = $(".timepicker-cf").offset().top - 2;

      if($(".timepicker").css('height') == '60px'){
        $(".timepicker-cf").animate({
          'height': '0px'
        }, { duration: 200, queue: false });
        $(".timepicker").animate({
          'top':top
        }, 200);
        $(".timepicker-cf").animate({
          'height': '60px'
        }, 200);
      }
      else{
        $(".timepicker").css('top',top);
        $(".timepicker, .timepicker-cf").animate({
          'height': '60px'
        }, 200);
      }
    }, 0);

    // display time on submit button
    time = $(".owl-stage .center").text();
    $(".request .time").text(time);

    $(".owl-item").removeClass("center-n");
    center = $(".owl-stage").find(".center");
    center.prev("div").addClass("center-n");
    center.next("div").addClass("center-n");
  }
});

// if the inputs arent empty force ":focus state"
$(".form-name input").each(function(){
  $(this).keyup(function() {
    if (this.value) {
      $(this).siblings("label").css({
        'font-size': '0.8em',
        'left': '.15rem',
        'top': '0%'
      });
    }
    // remove force if they're empty
    else{
      $(this).siblings("label").removeAttr("style");
    }
  });
});

$(".timepicker").on('click', '.owl-next', function(){
  time = $(".owl-stage .center").text();
  $(".request .time").text(time);

  $(".owl-item").removeClass("center-n");
  center = $(".owl-stage").find(".center");
  center.prev("div").addClass("center-n");
  center.next("div").addClass("center-n");
});

$(".timepicker").on('click', '.owl-prev', function(){
  time = $(".owl-stage .center").text();
  $(".request .time").text(time);

  $(".owl-item").removeClass("center-n");
  center = $(".owl-stage").find(".center");
  center.prev("div").addClass("center-n");
  center.next("div").addClass("center-n");
});

$('.owl').owlCarousel({
  center: true,
  loop: true,
  items: 5,
  dots: false,
  nav: true,
  navText: " ",
  mouseDrag: false,
  touchDrag: true,
  responsive: {
    0:{
      items:3
    },
    700:{
      items:5
    },
    1200:{
      items:7
    }
  }
});

$(document).on('click', '.ui-datepicker-next', function(e){
  $(".timepicker-cf").hide(0);
  $(".timepicker").css({
    'height': '0'
  });
  e.preventDefault();
  $(".ui-datepicker").animate({
    "-webkit-transform":"translate(100%,0)"
  }, 200);
});

$(document).on('click', '.ui-datepicker-prev', function(){
  $(".timepicker-cf").hide(0);
  $(".timepicker").css({
    'height': '0'
  });
  $(".ui-datepicker").animate({
    'transform': 'translateX(-100%)'
  }, 200);
});

$(window).on('resize', function(){
  $(".timepicker").css('top', $(".timepicker-cf").offset().top - 2);
});

*/
