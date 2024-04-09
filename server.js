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

// http://<IPv4>:8081/<request name>
const adcIp = require('./ipConst')
var server = app.listen(8081, adcIp, () => {
    console.log("Server is running.")
})