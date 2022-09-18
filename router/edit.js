const book = require('../model/book');

const router = require('express').Router();

router.get('/:id',(req,res)=>{
    const sess= req.session.username,
    _id= req.params.id;

    if (sess) {
        book.findOne({_id, Author:sess},(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                if (data) {
                    res.render('edit',{msg:'',value:{title:data.Title, Description:data.Descrption},_id})
                } else {
                    res.status(404).render('404')
                }
            }
        })
    } else {
        res.status(404).render('404')
    }
})


router.post('/:id',(req,res)=>{
    const sess = req.session.username,
    _id= req.params.id,
    collect = req.body;

    if (sess) {
        book.findOne({_id, Author:sess },(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                if (data) {
                    if (collect.Title!=null && collect.Descrption!=null) {
                        if (collect.Title.length>=3 && collect.Descrption.length>=15) {
                            book.findOneAndUpdate({_id,Author:sess},{Title:collect.Title, Descrption:collect.Descrption},(err,data)=>{
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (data) {
                                        res.redirect('/mypage')
                                    } else {
                                        res.status(404).render('404')
                                    }
                                }
                            })
                        } else {
                            res.render('edit',{msg:'input length too short',value:{title:data.Title, Description:data.Descrption},_id})
                        }
                    } else {
                        res.render('edit',{msg:'please fill the form',value:{title:data.Title, Description:data.Descrption},_id})
                        
                    }
                } else {
                    res.status(404).render('404')
                }
            }
        })
        
        
    } else {
        res.status(404).render('404')
    }
})


module.exports= router