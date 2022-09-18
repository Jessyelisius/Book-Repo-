const router = require('express').Router();

//db
const user = require('../model/user');
const bcrypt = require('bcrypt');

router.get('/', (req,res)=>{
    res.render('login',{msg:'',route:'/register', title:'Register'})
})

router.post('/',async(req,res)=>{
    const sess = req.session;
    const collect=req.body

    if (collect.username!=null && collect.password!=null) {
        if (collect.username.length>6 && collect.password.length>6) {
            user.findOne({User_name:collect.username},(err,data)=>{
                if (err) {
                    console.log(err);
                } else {
                    if (data) {
                        res.render('login',{msg:'user exist',route:'/register', title:'Register'})
                    } else {
                        const password = bcrypt.hashSync(collect.password, 5)
                        const newuser = new user({User_name:collect.username, Password: password})
                        newuser.save((err)=>{
                            if (err) {
                                console.log(err);
                            } else {
                                sess.username=collect.username;
                                res.redirect('/')
                            }
                        })
                    }
                }
            })
        } else {
            res.render('login',{msg:'input too short',route:'/register', title:'Register'})
        }
    } else {
        res.render('login',{msg:'fill the form',route:'/register', title:'Register'})
    }
})

module.exports = router