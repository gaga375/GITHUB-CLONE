let express = require('express');
let authRoute = require('./authRoute');
let repoRoute = require('./repoRoute');
let userRouter = require('./userRouts');
let issueRouter = require('./issuRoute');
let mainRouts = express.Router();

mainRouts.use(authRoute);
mainRouts.use(userRouter);
mainRouts.use(repoRoute);
mainRouts.use(issueRouter)

mainRouts.get('/', (req,res)=>{
    res.send('i love you tamanna')
})

module.exports = mainRouts;