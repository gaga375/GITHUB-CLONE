let express = require('express');
let authRoute = express.Router();
let authController = require('../controllers/authController')



authRoute.post('/user/login',authController.login)
authRoute.get('/user/logout',authController.logout)
authRoute.post('/user/register',authController.register)


module.exports = authRoute;