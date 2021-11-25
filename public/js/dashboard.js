const createPostBtn = document.getElementById('createPostBtn');
const formCtn = document.getElementById('formCtn');
const submitPostBtn = document.getElementById('submitPostBtn');

function createPost(e){
    e.preventDefault();
    if(createPostBtn.innerText === 'Create'){    
        formCtn.style.display = 'block';
        createPostBtn.innerText = 'Cancel'
        createPostBtn.style.backgroundColor = 'hsl(345, 100%, 61%)';
    } else {
        formCtn.style.display = 'none';
        createPostBtn.innerText = 'Create'
        createPostBtn.style.backgroundColor = 'hsl(171, 100%, 41%)';
    }
}

function submitPost(){
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const fetchBody = {
        title: title,
        content: content,
        date_posted : Date.now()
    }

    const response = fetch('api/users/createPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fetchBody)
    });

    if(response.ok){
        document.location.reload;
    } else {
        alert('Create Post Failed');
    }
}  

createPostBtn.addEventListener('click', createPost);