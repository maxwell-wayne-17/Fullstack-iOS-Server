const express = require('express')
const mongoose = require('mongoose')
var app = express()
app.use(express.json())
var Data = require('./basicSchema')

mongoose.connect("mongodb://localhost/newDB")

mongoose.connection.once("open", () => {
    console.log("Connected to DB.")
}).on("error", (error) => {
    console.log("Failed to connect " + error + ".")
})

// GET request will enable use to send info from server to the client
// Get all texts
// http://<IPv4>:8081/getall
app.get("/getall", (request, response) => {
    // Find everything
    Data.find({}).then((DBitems) => {
        response.send(DBitems)
    })
})

// Get a text by ID
// http://<IPv4>:8081/get
app.get("/get", (request, response) => {
    Data.findOne({_id: request.query._id}).then((DBItem) => {
        response.send(DBItem)
    })
})


// POST request will enable us to send info from client to server
// Create a new text
// http://<IPv4>:8081/create
app.post("/create", (request, response) => {
    var text = new Data({
        text: request.request.body.text
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

// Delete an existing text
// http://<IPv4>:8081/delete
app.post("/delete", async (request, response) => {
    try {
        await Data.findOneAndDelete({ _id: request.body.text })
        response.send("Deleted")
    } catch(error) {
        console.log("Failed delete with error: " + error)
    }
})

// Update an existing text
// http://<IPv4>:8081/update
app.post("/update", async (request, response) => {
    try{
        await Data.findOneAndUpdate({
            _id: request.body._id
        }, {
            text: request.body.text
        })
        console.log(request.body)
        response.send("Updated")
    } catch(error) {
        console.log("Failed to update: " + error)
    }
})

// http://<IPv4>:8081/<route name>
const {adcIp, homeIp} = require('./ipConst')
var server = app.listen(8081, homeIp, () => {
    console.log("Server is running.")
})