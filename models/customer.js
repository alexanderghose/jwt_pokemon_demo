const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    email: {type: String, default: ""}, // should be unique
    password: {type: String, default: ""},
})

// Below the word "pokemon" specifies the name of our collection(table in SQL parlance)
module.exports = mongoose.model('Customer', customerSchema)