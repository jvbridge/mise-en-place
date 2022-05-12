console.log('script loaded');

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initalView: "dayGridMonth",
    selectable: "true",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGrid",
    },
  });
  calendar.render();
});



const dateTime = document.querySelector('#today');

var currentDate = new Date();
var today = moment().format('dddd MMMM Do YYYY, h:mm:ss a');

dateTime.textContent = today
console.log(today);

