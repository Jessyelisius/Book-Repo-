const book = require('../model/book');
const user = require('../model/user');

const router = require('express').Router();

router.get('/', (req,res)=>{
    const sess = req.session.username;
    if (sess) {
        book.find({Author:sess},(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                if (data) {
                    res.render('user',{username:sess, books:data})

                } else {
                    res.render('user',{username:sess, books:[]})
                }
            }
        })
    } else {
        res.status(404).render('404')
    }
})


module.exports= router