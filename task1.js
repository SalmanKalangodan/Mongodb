const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(express.json())

mongoose.connect('mongodb://localhost/users');

const db = mongoose.connection;

db.on('error', console.error)
db.once('open',()=>{
    console.log('mongo db is conected');
})

const userschema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    username:String,
    photo:String,
})

const Users = mongoose.model('Users' , userschema)

app.post('/register',async (req,res)=>{
    try{
        const newuser = new Users({name : req.body.name , email: req.body.email , password : req.body.password})
        await newuser.save()
        res.json(newuser)
    }catch(err){
        console.log(err);
    }
})

app.post('/login' , async (req,res)=>{
    const {email , password} = req.body
    try{
     const user= Users.find({email:email , password : password})
     console.log(user);
    }catch (err) {
        console.log(err);
    }
})

app.listen(port, ()=>{
    console.log(`server is running ${port}`);
})



