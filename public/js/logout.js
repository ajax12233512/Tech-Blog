const logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/api/users/logout', {
        method: 'DELETE',  
    }).then((response) =>{
        console.log(response);
        if(response.ok){
                document.location.replace('/');
            } else {
                console.log(response.ok)
                alert('Logout Failed');
            }
    });
});