document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initalView: 'dayGridMonth',
        selectable: 'true'
    });
    calendar.render();
});