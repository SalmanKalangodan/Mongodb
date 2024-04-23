const multer = require('multer')
const express = require ('express')
const path = require('path')
const app = express()

const storge = multer.diskStorage({
    destination: (req , file , cb ) =>{
        cb( null,'./uploads')
    },
    filename:(req, file , cb) =>{
        cb(null , Date.now() + '' + file.originalname)
    }
})

const uplode  = multer({storage : storge})

app.post('/file' , uplode.single('uploads') , (req, res)=>{
    res.json({messege : 'seccess'})
})

app.listen(5000)

// const multer = require('multer');
// const express = require('express');
// const bodyParser = require('body-parser')
// const app = express();

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended : false}))


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Use a relative path without leading slash
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// app.post('/file', upload.single('file'), (req, res) => {
//     res.json({ message: 'success', filename: req.file.originalname });
// });

// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });


// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Define storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// // Initialize multer with the defined storage
// const upload = multer({ storage: storage });

// // Route for uploading a single file
// app.post('/upload', upload.single('file'), (req, res) => {
//     res.json({ message: 'File uploaded successfully', filename: req.file.filename });
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
