const jwt = require ('jsonwebtoken');
require('dotenv').config();
const userModel = require('../model/User');
const isLoggedIn = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.jwt_secret);
            req.user = await userModel.findById(decoded.userId);
            if(!req.user){
                return res.json("not authorized");
            }

        } catch (error) {
            console.log(error.message);
            
        }
        
    }

    if(!token) {
        return res.status(401).json('no token');
    }

    next()
}

const isAdmin = (req, res, next)=>{
    if(!req.user === "admin"){
        return res.send("No")
    }

    next()
}
module.exports = {isLoggedIn, isAdmin}