const dateTime = document.querySelector("#today");

var currentDate = new Date();
var today = moment().format("dddd MMMM Do YYYY, h:mm:ss a");

dateTime.textContent = today;
console.log(today);

getEvents = async () => {
  const response = await fetch("/api/events", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const events = await response.json();
  console.log("Events: ", events);
  return events;
};

renderCalendar = async () => {
  const eventsData = await getEvents();

  console.log("got data: ", eventsData);
  const events = eventsData.map((event) => {
    let ret = {
      title: event.title,
      start: event.start_date,
    };

    if (event.end_date) ret.end = event.end_date;
    return ret;
  });

  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    selectable: "true",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGrid",
    },
    events,
  });
  calendar.render();
};

document.addEventListener("DOMContentLoaded", renderCalendar);
