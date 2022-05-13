

const displayUpcoming = async () => {
  let upcomingEvents = $(".upcomingEvents");

  const response = await fetch("/api/events", {
    method: "POST",
    body: JSON.stringify({
      title,
      start_time,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/upcoming");
  } else {
    let result = await response.json();
    alert(result.message);
  }
};
