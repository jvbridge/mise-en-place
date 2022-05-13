// when input is entered and button is clicked
// then content is added to appropriate date square on calendar displaying event name
// and stored in the db
// then redirected to calendar overview

const submitHandler = async () => {
  console.log("submitted event");
  const eventName = document.querySelector("#event-name-input").value.trim();
  const eventDescription = document
    .querySelector("#event-description-input")
    .value.trim();
  const eventStart = document.querySelector("#event-start-input").value;
  const eventEnd = document.querySelector("#event-end-input").value;

  if (!eventName || !eventStart) return;

  const response = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: eventName,
      description: eventDescription,
      start_date: eventStart,
      end_date: eventEnd,
    }),
  });

  if (response.ok) {
    document.location.replace("/calendar");
  } else {
    alert(response.message);
  }
};

document
  .querySelector("#submit-event-button")
  .addEventListener("click", submitHandler);
