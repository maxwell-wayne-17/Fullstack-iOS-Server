var mongoose = require("mongoose")
var Schema = mongoose.Schema

// Schema to get text from the DB
var text = new Schema({
    text: String
})

const Data = mongoose.model("Data", text)

module.exports = Data