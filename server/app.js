const express = require('express')
const corse = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const db = require("./config/DB.js")


const app = express()
app.use(corse({ credentials: false, origin: "*" }))
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('public'))

app.get('/', function (req, res) {
    res.send('This message is from the server side')
})

try {
    db.authenticate();
    db.sync()
    console.log("DataBase conencted")
    app.listen(5000, () => {
        console.log("server is running")
    })
} catch (error) {
    console.log(error)
}