const mongoose = require('mongoose');
const validator = require('validator');

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
            maxLength: 50,
            validate(value) {
                if(!validator.isEmail(value)){
                    throw new Error ("Not a valid email")
                }
            }
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
            default: "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
            validate(value) {
                if(!validator.isURL(value)){
                    throw new Error ("Not a valid photo url")
                }
            }
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