const express = require('express')
const corse = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const db = require("./config/DB.js")
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/userRoute.js")
const authRoutes = require("./routes/authRoute.js")
const categoryRoutes = require("./routes/categoryRoute.js")
const productRoutes = require("./routes/productRoute.js")


const app = express()
app.use(corse({ credentials: false, origin: "*" }))
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('public'))

app.get('/', function (req, res) {
    res.send('This message is from the server side')
})

app.use('/api',userRoutes)
app.use('/api',authRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)




// middleware for set Error handling
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || 'خطایی رخ داده است';
    res.status(status).json({ message })
    next();
})
//*********************



try {
    db.authenticate();
    // db.sync()
    console.log("DataBase conencted")
    app.listen(5000, () => {
        console.log("server is running")
    })
} catch (error) {
    console.log(error)
}