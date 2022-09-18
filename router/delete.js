const book = require('../model/book');
const cloudinary =require('../utils/cloudinary')
const router = require('express').Router();

router.get('/:id',(req,res)=>{
    const sess= req.session.username,
    _id= req.params.id;

    if (sess) {
        if (_id.length==24) {
            book.findOneAndDelete({_id, Author:sess},(err,data)=>{
                if (err) {
                    console.log(err);
                } else {
                    if (data) {
                        cloudinary.v2.uploader.destroy(data.publicID,(err)=>{
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect('/mypage')
                            }
                        })
                        
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