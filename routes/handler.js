const express = require('express');
const { registerUser, loginUser, dashboard } = require('../controller/user.controller');
const { isLoggedIn, isAdmin } = require('../middleware/authenticate');
const { createHotel, getAllHotels, getOneHotel, deleteHotel, updateHotel } = require('../controller/hotel');


const router = express.Router();
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/dashboard').get([isLoggedIn, isAdmin], dashboard)
router.route('/create-hotel').post([isLoggedIn, isAdmin], createHotel)
router.route('/get-all-hotels').get(getAllHotels)
router.route('/get-one-hotel/:hotelName').get(getOneHotel)
router.route('/delete-one-hotel/:hotelName').delete([isLoggedIn, isAdmin], deleteHotel)
router.route('/update-hotel/:hotelName').patch([isLoggedIn, isAdmin], updateHotel)







module.exports = router