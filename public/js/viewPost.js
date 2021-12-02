const commentBtn = document.getElementById('commentBtn');
const formBox = document.getElementById('formBox')
const commentForm = document.getElementById('commentForm')
const submitCommentBtn = document.getElementById('submitCommentBtn')
const postId = document.getElementById('postId').innerText;

commentBtn.addEventListener('click', (e) => {
    if(e.target.innerText === 'Comment'){
        formBox.style.display = 'block'
        e.target.innerText = 'Cancel'
        e.target.style.backgroundColor = 'hsl(348, 100%, 61%)'
    } else {
        formBox.style.display = 'none';
        e.target.innerText = 'Comment';
        e.target.style.backgroundColor = 'hsl(141, 53%, 53%)'
    }
})

submitCommentBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const content = document.getElementById('content').value;

    fetch('/api/users/addComment', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({ content, postId }),
    }).then(response =>{
        if(response.ok){
            document.location.reload();
        } else {
            alert('Error adding comment')
        }
    })
})

