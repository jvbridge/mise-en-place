console.log('script loaded');

const dateTime = document.querySelector('#today');

var currentDate = new Date();
var today = moment().format('dddd MMMM Do YYYY, h:mm:ss a');

dateTime.textContent = today
console.log(today);

