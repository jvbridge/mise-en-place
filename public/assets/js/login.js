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
        if (response.ok){
            document.location.replace('/calendar');
        } else {
            let result = await response.json()
            alert(result.message)
        }
    }
}

document.querySelector('.modal-body').addEventListener('button')