const mongoose = require('mongoose')
require('dotenv').config

const connectionString = process.env.connectString

async function connectDb(){
    await mongoose.connect(connectionString)
    console.log("database connected successfully");
    
}

module.exports = connectDb


