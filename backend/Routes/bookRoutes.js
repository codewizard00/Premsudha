const express = require("express");
const { getAllBooks, createBook, deleteBook, getBooks, getAllBooksType } = require("../Controller/bookController");
const { getCompetition } = require("../Controller/competitionController");
const { authenticateJWT } = require("../Middleware/authentication");

const router = express.Router();

router.get('/get/AllBook/:book_type',getAllBooksType);

router.get('/get/AllBook',getAllBooks);

router.get('/get/books/:id',getBooks)

router.post('/create/books', authenticateJWT('ADMIN'), createBook);

// router.put('/update/competion/:id',authenticateJWT('ADMIN'),updatateCompetitions);

router.delete('/delete/book/:id',authenticateJWT('ADMIN'),deleteBook);

module.exports = router;