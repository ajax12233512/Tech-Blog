window.addEventListener('submit', (e)=>{    
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let request = new Request('api/users/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify( {username, password} ),
    });

    const fetchRequest = async () => await fetch(request).then( (response) =>{
        if(response.ok){
            document.location.replace('/');
        } else{
           alert('Something went wrong');
        }
    }).then((response) => {
        
    });
    
    fetchRequest();
});