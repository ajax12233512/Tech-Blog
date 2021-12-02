const Post = require('../models/Post');

const postData = [
    {
        title: 'Neil Post',
        content: "Neil's awesome post",
        date_posted: Date.now(),
        user_id: 1
    },
    {
        title: 'John Post',
        content: "Johns awesome post",
        date_posted: Date.now(),
        // comments: ['This is first comment', 'This is second comment'],
        user_id: 2
    },
    {
        title: 'Chris Post',
        content: "Chris awesome post",
        date_posted: Date.now(),
        user_id: 3
    }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;