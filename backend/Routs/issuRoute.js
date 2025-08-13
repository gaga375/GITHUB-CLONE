let express = require('express');
let issueRoute = express.Router();
let issueControler = require("../controllers/issueControler")

issueRoute.post("/issue/create",issueControler.createIssue);
issueRoute.post("/issue/update/:id",issueControler.updateIssueById);
issueRoute.get("/issue/delete/:id",issueControler.deleteIssueById);
issueRoute.get("/issue/user/:id",issueControler.getIssueByUserId);
issueRoute.get("/issue/:id",issueControler.getIssueById);


module.exports= issueRoute
