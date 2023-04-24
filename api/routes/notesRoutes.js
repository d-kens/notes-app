const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController.js');

router.route('/')
    .get()
    .post(notesController.createNewNote)
    .patch()
    .delete()


module.exports = router