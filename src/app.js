const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();
const {validateSignUpData} = require('./utils/validation');
const bcrypt = require('bcrypt');

app.use(express.json())

app.post('/signup', async (req, res) => {
    try{
        // validation of data
        validateSignUpData(req)

        const {firstName, lastName, emailId, password} = req.body;
    
        //password encription
        const passwordHash = await bcrypt.hash(password, 10);


        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });

        await user.save();
        res.send("User Added Successfully");
    } catch (err) {
        res.status(500).send("User Creation failed:" + err.message);
    }
})

app.post('/login', async (req, res) => {
    try {
        const {emailId, password} = req.body
        if(!validator.isEmail(emailId)){
            throw new Error('Not a valid email address')
        }
        const user = await User.findOne(emailId);
        if(!user) {
            res.status(400).send('Invalid credentials')
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid) {
            res.status(200).send('Logged in successful')
        } else {
            throw new Error ('Invalid credentials');
        }

    }  catch (err) {
        res.status(500).send("User Creation failed:" + err.message);
    }
});

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
        res.status(400).send("Something wend wrong")
    }
});

// Feed API - GET Feed - get all the users from users database
app.get('/feed', async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users)

    } catch {
        res.status(400).send("Something went wrong when fetching all users")
    }
});

app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId)
        res.send('User deleted successful')
    }  catch {
        res.status(400).send("Something wend wrong when deleting users")
    }
});

// Update data of the user by userId
app.patch('/user/:userId', async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed) {
            throw new Error("Update not allowed")
        }
        if(data?.skills.length > 10) {
            throw new Error("Skills cannot be more that 10");
        }
        await User.findByIdAndUpdate({_id: userId}, data, {
            returnDocument: "after",
            runValidators: true
        });
        res.send('Updated successful')
    } catch {
        res.status(400).send("Something wend wrong when updating users")
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
