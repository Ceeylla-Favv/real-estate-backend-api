const express = require('express'); 
const port = 2000;
require('dotenv').config()
const fileUpload = require('express-fileupload');

const app = express()
const bodyParser = require('body-parser')
const router = require('./routes/handler')
const connectDb = require('./db/connectDb');
const { isLoggedIn } = require('./middleware/authenticate');

// const { message } = require('antd');

// exxpress to json
app.use(express.json())
// use express file upload
app.use(fileUpload())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/", router)
app.get('/', (req,res)=>{
    console.log("app is running fine")
})



app.listen(port, async()=>{
    console.log(`app is runnning on port ${port}`)
    await connectDb()
})

