const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    name: {type: String, default: ""},
    number: {type: Number, default: ""},
})

// Below the word "pokemon" specifies the name of our collection(table in SQL parlance)
module.exports = mongoose.model('Pokemon', pokemonSchema)