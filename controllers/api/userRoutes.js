const router = require('express').Router();
const { Post } = require('../../models');
const { User } = require('../../models');


router.post('/register', async(req, res) =>{
    try{
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        

        req.session.save(() =>{
            req.session.loggedIn = true;
            req.session.username = req.body.username,
            req.session.password = req.body.password,
            req.session.userId = newUser.get('id');
            console.log('Conole here: Logged In', req.session.cookie);
            res.status(200).redirect('/');
        });

        

    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/logout', async(req, res)=>{
    try{
        await req.session.destroy();
        res.status(200).json({message: 'User Logged Out'})
    } catch(err){
        res.status(500).json({message: 'Error'});
    }
})

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
                user_id: req.session.userId//check to see if this returns anything
            });
            res.status(200).json({user: newPost, message: 'New Post created'});
        } catch(err) {
            console.log(err);
            res.status(500).json(err);
        }
    });

    router.put('/editPosts', async(req, res) =>{
        try{
            const selectedPost = await Post.findOne({
                where: {
                    id: req.body.postId                
                }
            });
            
            if(!selectedPost){
                // console.log('no user selected');
                res.status(500).json('no user selected')
            } else {
                selectedPost.title = req.body.updatedTitle;
                selectedPost.content = req.body.updatedContent;
                await selectedPost.save()
                res.status(200).json(selectedPost);
            }
            

        } catch (err) {
            res.status(500).json('Something went wrong');
        }
    })

    router.delete('/deletePosts', async(req, res)=>{
        try{
            const selectedPost = await Post.findOne({
                where: {
                    id: req.body.postId                
                }
            });
            
            if(!selectedPost){
                // console.log('no user selected');
                res.status(500).json('no user selected')
            } else {
                await selectedPost.destroy();
                res.status(200).json(selectedPost);
            }
            

        } catch (err) {
            res.status(500).json('Something went wrong');
        }
    });

    module.exports = router;