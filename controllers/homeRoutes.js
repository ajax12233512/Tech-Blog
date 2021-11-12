const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

router.get('/', (req, res) =>{
    res.render('homepage');
});

router.get('/users', async (req, res)=>{
    try{
        const allUsers = await User.findAll();
        res.json(allUsers);
    } catch (err){
        res.status(500).json(err);
    }
});

router.route('/register')
    .get((req, res) =>{
        res.render('register');
    })
    .post( async(req, res) =>{
        try{
            const newUser = await User.create({
                username: req.body.username,
                password: req.body.password
            });
            res.status(200).json({user: newUser, message: 'New user created'});
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    });

router.get('/allPosts', async(req, res) =>{
    try{
        const allPosts = await Post.findAll();
        // const newAllPosts = allPosts.map((post) =>{
        //     post.get({plain : true});
        // });
        res.status(200).json(allPosts);
    } catch(err){
        res.status(500).json(err);
    }
});

router.route('/posts')
    .get( async (req, res) =>{
        try{
            res.status(200).render('posts');
        } catch(err) {
            res.json(err)
        }
    })
    .post( async(req, res) =>{
        try{
            const newPost = await Post.create({
                title: req.body.title,
                content: req.body.content,
                date_posted: req.body.date_posted
            });
            res.status(200).json({user: newPost, message: 'New Post created'});
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    });

module.exports = router;