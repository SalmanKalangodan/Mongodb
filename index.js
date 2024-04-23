const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const  app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

mongoose.connect('mongodb://localhost/users');


const db = mongoose.connection;

db.on('error' ,console.error.bind(console,"error"))
db.once('open',()=>{
    console.log('db connected');
})

const userschema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
}) 
const User = mongoose.model('User' , userschema)

app.get('/', async (req,res)=>{
   const users = await User.find({})
   res.json(users)
})

app.post('/' , async (req,res)=>{
    try{
        const newUser = new User(req.body);
        console.log(req.body);
        await newUser.save()
        res.status(201).json(newUser)
    }catch(err) {
      res.status(500).json("server not responding")
    }
  
})

app.listen(5005,()=>{
    console.log('server is running');
})
