const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const app = express()
const crypto = require('crypto');

// Generate a secure secret key
const Key = crypto.randomBytes(64).toString('hex');

console.log("Secure Secret Key:", Key);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended :false}))



const  users = [
    {name : 'salman' , password : '123' ,id : 1},
    {name : 'salman2' , password : '456', id : 2}
]

app.post('/login' , (req,res)=>{
    const {name , password } = req.body;

    const user = users.find((value)=>value.name === name && value.password === password)
    if(user){
        const token = jwt.sign({id: user.id , name : user.name}, Key ,{expiresIn : '1h'})
        res.json({token})
    }else{
        res.json("invalid")
    }
})

const authtoken = (req , res , next) =>{
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InNhbG1hbiIsImlhdCI6MTcxMzg5MTkzNSwiZXhwIjoxNzEzODk1NTM1fQ.k5DmN0iuc8V_QIk_yrWukaJ72L6zrHxyg70ZgHMK0og"

jwt.verify(token, Key , (err, decode)=>{
    if(err) return res.json(err)
    req.user = decode
next()
})
}
app.get('/users', authtoken , (req, res)=>{
    res.json(req.user)
})

app.listen(4000)


