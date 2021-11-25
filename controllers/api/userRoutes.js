const router = require('express').Router();
const { Post } = require('../../models');
const { User } = require('../../models');


router.post('/register', async(req, res) =>{
    try{
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        res.status(200).json({user: newUser, message: 'New user created'});

        req.session.save(() =>{
            req.session.loggedIn = true;
            req.session.username = req.body.username,
            req.session.password = req.body.password
            console.log('Conole here: Logged In', req.session.cookie);
        });

    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.route('/login')
    .post( async(req, res)=>{
        console.log('here');
        try{
            const loginUser = await User.findOne({
                where: {
                    username: req.body.username,
                    password: req.body.password 
                }
            });

            if(!loginUser) {
                res
                    .status(400)
                    .json({message: 'Incorrect credentials'})
            }

            req.session.save(() =>{
                req.session.loggedIn = true;
                req.session.username = req.body.username,
                req.session.password = req.body.password
                req.session.userId = loginUser.get('id');
                console.log('Conole here: Logged In', req.session.cookie);
                res.status(200).json({message: 'User logged In'});
            });

        } catch (err){
            res.status(500);
            console.log(err);

        }


    });

    router.post('/createPosts', async(req, res) =>{
        try{
            const newPost = await Post.create({
                title: req.body.title,
                content: req.body.content,
                date_posted: req.body.date_posted,
                user_id: req.session.userId
            });
            res.status(200).json({user: newPost, message: 'New Post created'});
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    });

    module.exports = router;