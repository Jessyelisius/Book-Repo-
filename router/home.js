const router = require('express').Router();

const user = require('../model/user'),
    book = require('../model/book');


router.get('/',(req,res)=>{
    const sess = req.session;
// console.log(req);
    if (sess.username) {
        book.find({},(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                if (data) {
                   res.render('home',{username: sess.username, books:data}) 
                    
                } else {
                   res.render('home',{username: sess.username, books:[]}) 
                }
            }
        })
        
    } else {
        res.redirect('/login')
    }
})

module.exports= router
