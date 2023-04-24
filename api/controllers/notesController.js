const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');


// @desc create new note
// @route POST /notes
// @access private
const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body

    if(!user || !title || !text) {
        return res.status(400).json({
            message: 'All fields are required'
        })
    }

    const duplicate = await Note.findOne({ title }).lean().exec();

    if(duplicate) {
        return res.status(409).json({
            message: 'Duplicate note title'
        })
    }

    const note = await Note.create({
        user,
        title,
        text
    })

    if(note) {
        return res.status(201).json({
            message: 'note created'
        })
    } else {
        return res.status(400).json({
            message: 'invalid note data received'
        })
    }
})

module.exports = {
    createNewNote
}