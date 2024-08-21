const express = require('express');
const { registerUser, loginUser, dashboard } = require('../controller/user.controller');
const { isLoggedIn, isAdmin } = require('../middleware/authenticate');


const router = express.Router();
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/dashboard').get([isLoggedIn, isAdmin], dashboard)



module.exports = router