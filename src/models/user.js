const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 50
        },
        lastName: {
            type: String,
            maxLength: 50
        },
        emailId: {
            type: String,
            lowerCase: true,
            required: true,
            unique: true,
            trim: true,
            maxLength: 50
        },
        password: {
            type: String,
            required: true,
            maxLength: 15
        },
        age: {
            type: Number,
            min: 18
        },
        gender: {
            type: String,
            validate(value){
                if(!['male', 'female', 'others'].includes(value.toLowerCase())){
                    throw new Error('Gender data is not valid')
                }
            }
        },
        photoUrl: {
            type: String,
            default: ""
        },
        about: {
            type: String,
            default: "This is the default about section.",
            maxLength: 250
        },
        skills: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);