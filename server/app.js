const express = require('express')
const corse = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");


const app = express()
app.use(corse({ credentials: false, origin: "*" }))
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('public'))

app.get('/', function (req, res) {
    res.send('This message is from the server side')
})

app.listen(5000)