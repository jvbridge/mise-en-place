// when icon clicked
const addBtn = document
  .querySelector(".addCheck")
  .addEventListener("click", function newCheckForm() {
    // event.preventDefault();

    const addCheckForm = $("addCheck-form");
    // then display input text box
    addCheckForm.removeAttribute("hidden");

    // then input is added to the list with empty checkbox
  });

// create new checklist item
const createNewCheck = document
  .querySelector("#addon-btn")
  .addEventListener("click", async function () {
    const routeStr =
      "/api/checklist" + wrapper.dataset.checklist - id + "/item";

    const response = await fetch(routeStr, {
      method: "POST",
      body: JSON.stringify({}),
    });
  });

async function checkFormHandler(event) {
  event.preventDefault();

  const checkList = document.querySelector("#addInput").value.trim();

  if (checkList) {
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

async function checkFormHandler(event) {
  event.preventDefault();

  const checkItem = document.querySelector("#data-checklist-id").value.trim();

  if (checkItem) {
    const response = await fetch("/api/checklist-item/", {
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

const checkboxToggle = async (event) => {
  const eleId = event.target.id;
  //get the last number from the id
  const arrItemIndex = eleId.match(/[0-9]+$/);
  const checkItemIndex = Number.parseInt(arrItemIndex[0]);
  const routeStr = `/api/checklist-item/${checkItemIndex}/toggle`;
  const response = await fetch(routeStr, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    alert(response.message);
  }
};

document.querySelectorAll(".checklist-item-checkbox").forEach((element) => {
  element.addEventListener("click", checkboxToggle);
});

// add edit and delete buttons ?

// if checkbox is clicked
// then move that item to the bottom
// change its background color
