const router = require('express').Router();
const { Post } = require('../models');
const { User } = require('../models');
const { Comment } = require('../models');

router.get('/', async (req, res) =>{
    try{
        const allPosts = await Post.findAll();
        const plainAllPosts =  (allPosts.map(post => {
            return post.get({plain: true});
        }))
        res.render('homepage', {plainAllPosts, loggedIn : req.session.loggedIn});
    } catch (err) {
        console.log(err);
    }
});


router.route('/login')
    .get((req, res)=>{
        res.render('login', {loggedIn: req.session.loggedIn});
    })

// Dashboard
router.route('/dashboard')
.get(async(req, res)=>{
    try{
        const userPosts = await User.findOne({
            where: {
                username : req.session.username,
                password : req.session.password
            },
            include: [
                {
                    model: Post
                }
            ]
        });
        console.log(userPosts);
        const plainUserPosts = userPosts.get({plain: true});
        res.render('dashboard', {plainUserPosts, loggedIn: req.session.loggedIn});
    } catch(err){
        res.status(500).json({Error: {err}, message: 'not rendering the right text. Still a work in progress'});
        console.log(err);
    }
    
})

router.get('/allUsers', async (req, res)=>{
    try{
        const allUsers = await User.findAll();
        res.json(allUsers);
    } catch (err){
        res.status(500).json(err);
    }
});

router.get('/allComments', async (req, res) => {
    try{
        const allComments = await Comment.findAll()
        res.json(allComments)
    } catch (err){
        res.json(err)
    }
});

router.route('/register')
    .get((req, res) =>{
        res.render('register', {loggedIn : req.session.loggedIn});
    })

router.route('/login')
.get((req, res)=>{
    res.render('login');
})


router.get('/allPosts', async(req, res) =>{
    try{
        const allPosts = await Post.findAll();
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

router.get('/posts/:id', async(req, res) =>{
    try{
        const post = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [ 
                {
                    model: Comment,
                    include: [
                        {
                            model: User
                        }
                    ]
                },
            ],
            plain: true
        });

        console.log(post)
        
        if(!post){
            res.status(500).json({message: 'User not found'});
        } else {
            res.status(200).render('viewPost', { post, loggedIn: req.session.loggedIn });
            // res.status(200).json(post);
        } 
    } catch (err) {
        res.status(500).json({message: 'Error in server', err})
    }
});
    
module.exports = router;