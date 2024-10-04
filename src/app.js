const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

app.post('/signup', async (req, res) => {
    const user = new User({
        firstName: 'Virat',
        lastName: 'Kohli',
        emailId: 'virat@paluri.com',
        password: 'Virat!123'
    })

    try {
        await user.save();
        res.send("User Added Successfully");
    } catch (err) {
        res.status(500).send("User Creation failed:", err.message);
    }
})

connectDB()
    .then(() => {
        console.log("connection established to DB was successfully");
        app.listen(7777, () => {
            console.log('Server successfully listening at port 7777')
        });
    })
    .catch((err) => {
        console.log("Failed to connect DB", err)
    })
