const { model } = require('mongoose');
let userController = require('../controllers/userController')
let express = require('express');
let userRouter = express.Router();
let uploadFile = require("../controllers/code")
let upload = require("../Middleware/uiploadMiddleware")

userRouter.get("/allUsers",userController.getAllUsers);
userRouter.get("/userProfile/:id",userController.getUserProfile);
userRouter.get("/updateProfile/:id",userController.updateUserProfile);
userRouter.get("/deleteProfile/:id",userController.deleteUserProfile);
userRouter.post('/upload',upload.single('file'),uploadFile.uploadFile);
userRouter.get('/upload/:id',uploadFile.getrepofile);


module.exports = userRouter;