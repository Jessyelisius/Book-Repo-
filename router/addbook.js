const router = require('express').Router();
const date = require('date-and-time');

//db
const books = require('../model/book'),
 user = require('../model/user'),
 cloudinary = require('../utils/cloudinary')

router.get('/',(req,res)=>{
    const sess = req.session.username,
        collect = req.body,
        book = req.files;

    if (sess) {
       res.render('addbook',{msg:''})
    } else {
        res.redirect('/')
    }
})


router.post('/',(req,res)=>{
    const sess = req.session.username,
        collect = req.body,
        book = req.files;

    if (sess) {
        if (collect.Title!= null && collect.Descrption!= null) {
            if (collect.Title.length>3 && collect.Descrption.length>=15) {
                user.findOne({User_name:sess},(err,data)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        if (data) {
                            if (book) {
                                if (book.booky.mimetype=='application/pdf') {
                                    const now = new Date
                                    cloudinary.v2.uploader.upload(book.booky.tempFilePath,{folder:'bookstorage',resource_type:'auto',unique_filename: true},(err,result)=>{
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            const newbook= new books
                                            newbook.Title= collect.Title;
                                            newbook.Author= sess;
                                            newbook.Descrption =collect.Descrption;
                                            newbook.Book_link= result.secure_url;
                                            newbook.Date= date.format(now,'h:mm D/M/YYYY');
                                            newbook.publicID= result.public_id;
                                            newbook.save(err=>{
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    res.redirect('/')
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    res.render('addbook',{msg:'invalid filetype'})
                                    
                                }
                            } else {
                                res.render('addbook',{msg:'omo no file'})
                            }
                            
                        } else {
                            res.status(404).render('404')
                        }
                    }
                })
            } else {
                res.render('addbook',{msg:'input not complete'})
            }
        } else {
            res.render('addbook',{msg:'fill all input'})
        }
    } else {
        res.redirect('/')
    }
})

module.exports= router