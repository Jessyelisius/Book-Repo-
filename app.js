const session = require('cookie-session');
const app = express()
const port = process.env.PORT|| 3000
require('dotenv').config()

//db

//Jessy
//sJdkHzWLKLkGAtn3
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Jessy:sJdkHzWLKLkGAtn3@cluster0.a6xsfix.mongodb.net/bookstorage?retryWrites=true&w=majority',{useNewURLParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('db connected');
    app.listen(port, () => console.log(`app listening on port ${port}!`))
}).catch(err=>{
    console.log(err);
})

//middleware
app.use(require('cors')())//cors
app.use(require('morgan')('dev'))//morgan
const _=require('lodash')


const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true,limit:'50mb'}))
const fileupload = require('express-fileupload');
app.use(fileupload({useTempFiles:true}));

app.set('view engine', 'ejs')
console.log(process.env.sessionpass);
const session = require('express-session')
app.use(session({secret:process.env.sessionpass, saveUninitialized:true,resave:true,cookie:{maxAge:604800000}}))

app.use(express.static('public'))

app.use('/login',require('./router/login'))

app.use('/register',require('./router/register'))

app.use('/logout',require('./router/logout'))

app.use('/addbook',require('./router/addbook'))

app.use('/mypage',require('./router/user'))

app.use('/delete',require('./router/delete'))

app.use('/edit',require('./router/edit'))

app.use('/article',require('./router/singlepage'))

app.use('/',require('./router/home'))



app.use(require('./router/404'))