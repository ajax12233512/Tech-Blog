const Comment = require('../models/Comment');

const commentData = [
    {
        post_id : 1,
        user_id : 1,
        content: 'First Comment' 
    },
    {
        post_id : 2,
        user_id : 2,
        content: 'Second Comment' 
    },
    {
        post_id : 3,
        user_id : 3,
        content: 'Third Comment' 
    },
]

const seedComment = () => Comment.bulkCreate(commentData)

module.exports = seedComment;