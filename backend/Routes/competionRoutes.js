const express = require("express");
const { createCompetitions, getAllCompetition, getCompetition, updatateCompetitions, deleteCompetition } = require("../Controller/competitionController");
const { authenticateJWT } = require("../Middleware/authentication");

const router = express.Router();

router.get('/get/AllCompetion', getAllCompetition)

router.get('/get/competition/:id',authenticateJWT('ADMIN'),getCompetition)

router.post('/create/competition', authenticateJWT('ADMIN'), createCompetitions);

router.put('/update/competion/:id',authenticateJWT('ADMIN'),updatateCompetitions);

router.delete('/delete/competion/:id',authenticateJWT('ADMIN'),deleteCompetition);

module.exports = router;