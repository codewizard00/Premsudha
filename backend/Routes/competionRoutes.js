const express = require("express");
const { createCompetitions, getAllCompetition, getCompetition, updatateCompetitions, deleteCompetition, getAllCompetitionType } = require("../Controller/competitionController");
const { authenticateJWT } = require("../Middleware/authentication");

const router = express.Router();

router.get('/get/AllCompetion', getAllCompetition)
router.get('/get/AllCompetion/:type', getAllCompetitionType)

router.get('/get/competition/:id',getCompetition)

router.post('/create/competition', authenticateJWT('ADMIN'), createCompetitions);

router.put('/update/competition/:id',authenticateJWT('ADMIN'),updatateCompetitions);

router.delete('/delete/competition/:id',authenticateJWT('ADMIN'),deleteCompetition);

module.exports = router;