const mongoose = require('mongoose');

const connectDB = async () => {
    return await mongoose.connect("mongodb+srv://hemanthpaluri:AlnHq2VDelu7vOb7@cluster0.bpyfd.mongodb.net/devTinder");
}

module.exports = connectDB
