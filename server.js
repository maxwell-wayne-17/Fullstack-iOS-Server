const express = require('express')
const mongoose = require('mongoose')
var app = express()
var Data = require('./basicSchema')

mongoose.connect("mongodb://localhost/newDB")

mongoose.connection.once("open", () => {
    console.log("Connected to DB.")
}).on("error", (error) => {
    console.log("Failed to connect " + error + ".")
})

// GET request will enable use to send info from server to the client


// POST request will enable us to send info from client to server
// Create a new text
// http://<IPv4>:8081/create
app.post("/create", (request, response) => {
    var text = new Data({
        text: request.get("text")
    })
    text.save().then(() => {
        if (text.isNew == false) {
            const savedData = "Saved data"
            console.log(savedData)
            response.send(savedData)
        } else {
            console.log("Failed to save data")
        }
    })
})

// http://<IPv4>:8081/<route name>
const adcIp = require('./ipConst')
var server = app.listen(8081, adcIp, () => {
    console.log("Server is running.")
})