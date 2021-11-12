window.addEventListener('submit', (e)=>{    
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const date_posted = Date.now();

    let request = new Request('/posts', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify( {title, content, date_posted} ),
    });

    const fetchRequest = async () => await fetch(request).then( (response) =>{
        response.json();
    }).then( (data) => {
        console.log(data);
    }).catch( (err) => {
        err.json(err);
    })
    
    fetchRequest();
});