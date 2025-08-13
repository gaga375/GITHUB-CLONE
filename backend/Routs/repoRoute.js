let express = require('express');
let repoRoute = express.Router();
let repoController = require('../controllers/repoController');

repoRoute.post('/create', repoController.CreateRepository);
repoRoute.get('/allrepofetch',repoController.getAllRepository);
repoRoute.get("/repositories/:id",repoController.fetchRepositoryById);
repoRoute.get("/repositoriesname/:name", repoController.fetchRepositoryByName);
repoRoute.get("/userrepo/:id",repoController.fetchRepositoryForCurrentUser);

repoRoute.post("/repositori/update/:id" , repoController.updateRepositoryById);

repoRoute.get('/repositories/delete/:id',repoController.deleteRepositoryById);

module.exports = repoRoute;