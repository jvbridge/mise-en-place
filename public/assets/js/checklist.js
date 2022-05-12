// when icon clicked
const addBtn = document
  .getElementById("addcheck");
//   .addEventListener("click", newCheckForm);

// when add item is clicked
const newCheckForm = (event) => {
    event.preventDefault();

  addBtn.setAttribute("aria-hidden", true);

  const addCheckForm = document.getElementById("addCheck-form");
  // then display input text box
  if (addCheckForm.style.display === "none") {
    addCheckForm.style.display = "inline";
  } else {
    addCheckForm.style.display = "none";
  }
  // then input is added to the list with empty checkbox
};

// add edit button ?

// if checkbox is clicked
// then move that item to the bottom
// change its background color
