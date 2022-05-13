async function loginFormHandler(event) {
  console.log("login handler called");
  event.preventDefault();

  const email = document.querySelector("#email-input-login").value.trim();
  const password = document.querySelector("#password-input-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      let result = await response.json();
      alert(result.message);
    }
  }
}

async function signupFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-input-signup").value.trim();
  const password = document
    .querySelector("#password-input-signup")
    .value.trim();

  if (email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(result.message);
    }
  }
}

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector("#login-btn")
  .addEventListener("click", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);

document
  .querySelector("#signup-btn")
  .addEventListener("click", signupFormHandler);
