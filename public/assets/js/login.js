async function loginFormHandler(event) {
    event.preventDefault();

    const email= document.querySelector('#inputUsername').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
    }
}
