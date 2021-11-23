window.addEventListener('submit', async (e)=>{    
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let request = new Request('/api/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify( {username, password} ),
    });

    const fetchRequest = await fetch(request);
    if(fetchRequest.ok){
        document.location.replace('/');
    } else {
        alert('failed to log in')
    }

});