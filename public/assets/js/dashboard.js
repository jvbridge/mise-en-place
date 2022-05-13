console.log('script loaded');

const dateTime = document.querySelector('#today');

var currentDate = new Date();
var today = moment().format('dddd MMMM Do YYYY, h:mm:ss a');

dateTime.textContent = today
console.log(today);


// display all events
async function checkFormHandler(event) {
    event.preventDefault();
  
    const eventItem = document.querySelector("#addInput").value.trim();
   checkItem.append()
  
    if (eventItem) {
      const response = await fetch("/api/checklist", {
        method: "POST",
        body: JSON.stringify({
          name,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/checklist");
      } else {
        let result = await response.json();
        alert(result.message);
      }
    }
  }