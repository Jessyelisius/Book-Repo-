const book = require('../model/book');

const router = require('express').Router();

router.get('/:id',(req,res)=>{
    const sess= req.session.username,
    _id= req.params.id;

    if (sess) {
        if (_id.length==24) {
            book.findOne({_id, Author:sess},(err,data)=>{
                if (err) {
                    console.log(err);
                } else {
                    if (data) {
                        res.render('single',{item:data})
                    } else {
                        res.status(404).render('404')
                    }
                }
            })
        } else {
            res.status(404).render('404')
        }
        
    } else {
        res.status(404).render('404')
    }
})


module.exports= router