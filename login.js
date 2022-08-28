let form = document.getElementById('login-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let formData = {
        'username': form.username.value,
        'password': form.password.value
    }

    fetch('https://devsearchweb.herokuapp.com/api/users/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('DATA:', data.access)
            if (data.access) {
                localStorage.setItem('token', data.access)
                alert(localStorage.getItem('token', data.access))
                //window.location.href = 'https://davidudo.github.io/devsearch-api-web/'
            } else {
                alert('Username OR password did not work')
            }
            return false
        })
})
