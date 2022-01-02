const { Schema, model, Collection } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    }
}, { Collection: 'users'});


module.exports = model('User', userSchema);