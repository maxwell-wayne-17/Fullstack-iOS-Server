const express = require('express')
const mongoose = require('mongoose')
var app = express()
var Data = require('./basicSchema')

mongoose.connect("mongodb://localhost/newDB")

mongoose.connection.once("open", () => {
    console.log("Connected to DB")
}).on("error", (error) => {
    console.log("Failed to connect " + error)
})

