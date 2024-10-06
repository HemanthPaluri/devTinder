const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();

app.use(express.json())

app.post('/signup', async (req, res) => {

    const user = new User(req.body);

    try {
        await user.save();
        res.send("User Added Successfully");
    } catch (err) {
        res.status(500).send("User Creation failed:", err.message);
    }
})

app.get('/user', async (req, res) => {

    const userEmailId = req.body.emailId

    try{
        const users = await User.find({emailId: userEmailId});

        if(users.length === 0 ){
            res.status(400).send("User not found")
        } else {
            res.send(users)
        }
    } catch {
        console.log("Something wend wrong")
    }
});

// Feed API - GET Feed - get all the users from users database
app.get('/feed', async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users)

    } catch {
        console.log("Something wend wrong when fetching all users")
    }
});

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
