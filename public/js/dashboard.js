const createPostBtn = document.getElementById('createPostBtn');
const formCtn = document.getElementById('formCtn');
const submitPostBtn = document.getElementById('submitPostBtn');
const editBtns = document.querySelectorAll('#editBtns');
const deleteBtns = document.querySelectorAll('#deleteBtns');

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

function submitPost(e){
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const fetchBody = {
        title: title,
        content: content,
        date_posted : Date.now()
    }

    const request = async () => { 
        return await fetch('api/users/createPosts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fetchBody)
        }).then((response) =>{
            if(response.ok){
                document.location.reload();
                } else {
                    console.log(response.ok)
                    alert('Create Post Failed');
                }
        });
    }   

    request();
}  


editBtns.forEach(btn => {
    btn.addEventListener('click', (e)=>{
        e.preventDefault();
        // console.log(e.target.parentElement.children[4])
        const editFormBox = e.target.parentElement.children[4];
        const postId = editFormBox.children[0].children[0].innerText;
        const submitEditBtn = editFormBox.children[0].children[5];
        console.log();
        
        
        if(e.target.innerText === 'Edit'){
            editFormBox.style.display = 'block';
            e.target.backgroundColor = 'hsl(345, 100%, 61%)'
            e.target.innerText = 'Cancel'
        } else {
            editFormBox.style.display = 'none';
            e.target.backgroundColor = 'hsl(171, 100%, 41%)'
            e.target.innerText = 'Edit';
        }

        submitEditBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            const updatedTitle = editFormBox.children[0].children[2].value;
            const updatedContent = editFormBox.children[0].children[4].value;


            fetch('api/users/editPosts', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({updatedTitle, updatedContent, postId})
            }).then((response) =>{
                console.log(response);
                if(response.ok){
                        document.location.reload();
                    } else {
                        console.log(response.ok)
                        alert('Edit Post Failed');
                    }
            });

            console.log('submit button clicked');
        })

    })
})

deleteBtns.forEach(btn => {
    btn.addEventListener('click', (e)=>{
        const thisDeleteBtn = e.target;
        const postId = thisDeleteBtn.parentElement.children[4].children[0].children[0].innerText;

        fetch('api/users/deletePosts', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({postId})
        }).then((response) =>{
            console.log(response);
            if(response.ok){
                    document.location.reload();
                } else {
                    console.log(response.ok)
                    alert('Delete Post Failed');
                }
        });
    })
});


createPostBtn.addEventListener('click', createPost);
submitPostBtn.addEventListener('click', submitPost);