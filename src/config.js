const mongoose = require('mongoose')
const connect = mongoose.connect("mongodb://localhost:27017/project")

// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema
const Loginschema = new mongoose.Schema({
    uname: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    surname: {
        type: String,
        required: true
    }
});
const Tschema = new mongoose.Schema({
    uname: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    surname: {
        type: String,
        required: true
    }
});
// collection part
const collection = new mongoose.model("users", Loginschema);
const collection1 = new mongoose.model("teachers", Tschema);
module.exports = {
    collection1,
    collection
};
