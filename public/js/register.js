window.addEventListener('submit', (e)=>{    
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let request = new Request('/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify( {username, password} ),
    });

    const fetchRequest = async () => await fetch(request).then( (response) =>{
        response.json();
    }).then( (data) => {
        console.log(data);
    }).catch( (err) => {
        err.json();
    })
    
    fetchRequest();
});