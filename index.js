const express =require("express")
const app=express();
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
app.use(express.urlencoded({extended:false}));
app.use(express.json())
const PORT=5100
const db_url='mongodb://localhost:27017/udaan'
app.get('/',(req,res)=>{
    console.log("run");
    // console.log(res.header);
    res.send("hello");
})

mongoose.connect(db_url)
.then(()=>{console.log("connected to database")})
.catch(()=>{console.log("db error")})

require('./models/class')
require('./models/user')

app.use('/add',require('./routes/adduser.js'))
app.listen(PORT,()=>{console.log("started listening")})