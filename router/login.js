const router = require('express').Router();

const user = require('../model/user')

const bcrypt = require('bcrypt')

router.get('/',(req,res)=>{
    res.render('login',{msg:'',route:'/login', title:'Login'})
})

router.post('/',(req,res)=>{
    const sess =req.session;
    const collect = req.body

    if (collect.username!= null && collect.password!=null) {
        if (collect.username.length>6 && collect.password.length>6) {
            user.findOne({User_name:collect.username}, (err,data)=>{
                if (err) {
                    console.log(err);
                } else {
                    if (data) {
                        const password = bcrypt.compareSync(collect.password,data.Password);
                        if (password==true) {
                            sess.username= data.User_name;
                            res.redirect('/')
                        } else {
                            res.render('login',{msg:'password incorrect', route:'/login', title:'Login'})       

                        }
                        

                    } else {
                        res.render('login',{msg:'username not found', route:'/login', title:'Login'})       
                        
                    }
                }
            })
        } else {
            res.render('login',{msg:'length of inputs too short', route:'/login', title:'Login'})       
            
        }
    } else {
        res.render('login',{msg:'fill the form', route:'/login', title:'Login'})       
    }
})


module.exports = router;