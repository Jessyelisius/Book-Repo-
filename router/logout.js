const router = require('express').Router();

router.get('/',(req,res)=>{
    req.session.destroy((err)=>{
        if (err) {
            console.log(err);
        } else {
            res.redirect('/')
        }
    })
})


module.exports= router