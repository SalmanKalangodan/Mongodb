const bcrypt = require('bcryptjs')

const compare = 'Sk@9446671462'
const password = "Sk@9446671462";
const salt = 10;
let store = "$2a$10$XMpPOi7tsvEmr2EmSyvUUOQDSeBx8y6tSUCQziZGZWAhuDJBEUXSu"

bcrypt.hash(password , salt , (err, hash)=>{
    if(err){
        console.log(err);
    }else{
        console.log(hash);
    }
})

bcrypt.compare( compare,store, (err, result)=>{
    if(err){
        console.log(err);
    }
    if(result){
        console.log('Passwords match');
    }
    else{
        console.log('not macth');
        console.log(result);
    }
})