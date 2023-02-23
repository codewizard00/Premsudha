const express = require('express');
const { getAllTeam, createTeam, updateTeam, deleteTeam, getTeam } = require('../Controller/TeamController');
const { authenticateJWT } = require('../Middleware/authentication');


const router = express();

//Crud Operations

router.get("/get/Allteams",getAllTeam);

router.get("/get/teams/:id",authenticateJWT('ADMIN'),getTeam);

router.post("/create/teams",authenticateJWT('ADMIN'),createTeam);

router.post("/update/team/:id",authenticateJWT('ADMIN'),updateTeam);

router.delete("/delete/team/:id",authenticateJWT('ADMIN'),deleteTeam);


module.exports = router;
