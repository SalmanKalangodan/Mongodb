const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost/users', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB!');
});

// Define the User schema using Mongoose
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone:String,
});

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

// Route to create a new user
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Route to retrieve all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users' });
    }
});

app.patch('/users', async (req, res) => {
    try {
        const email = req.body.email;

        // Find the user by email
        const updateUser = await User.findOne({ email: email });

        // If the user is not found, return an error
        if (!updateUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's information
        updateUser.name = req.body.name || updateUser.name;
        updateUser.email = req.body.email || updateUser.email;
        updateUser.phone = req.body.phone || updateUser.phone;

        // Save the updated user
        await updateUser.save();

        res.json(updateUser);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
});


app.listen(30001, () => {
    console.log('Server is running on port 30001');
});
