const User = require('../models/User');
const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');


// @desc get all notes
// @route GET /notes
// @access Private
const getAllnotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().lean()

    if(!notes?.length) {
        return res.status(400).json({
            message: "no notes found"
        })
    }

    /*
    TODO: Add username to each not before sending the response
    */
    // const notesWithUser = await Promise.all(notes.map(async (note) => {
    //     const user = await User.findById(note.user).lean().exec()
    //     return { ...note, username: user.username }
    // }))

    res.json(notes)
})

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

// @desc update note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    /*
    confirm data
    */
    if(!id || !user || !title || !text || typeof completed !== 'boolean'){
        return res.status(400).json({
            message: 'all fields are required'
        })
    }

    /*
    confirm note exists to update
    */
    const note = await Note.findById(id).exec();
    if(!note) {
        return res.status(400).json({
            message: 'note not found'
        })
    }

    /*
    check for duplicate title
    */
    const duplicateNote = await Note.findOne({ title }).lean().exec();

    if(duplicateNote && duplicateNote?._id.toString() !== id) {
        return res.status(409).json({
            message: 'duplicate note title'
        })
    }


    note.user = user;
    note.title = title;
    note.text = text;
    note.completed = completed;

    const updatedNote = await note.save();
    res.json({
        message: `${updatedNote.title} updated`
    })
})

// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body

    /*
    Confirm data
    */
    if (!id) {
        return res.status(400).json({ message: 'note id required' })
    }

    /*
    Confirm note exists to delete 
    */
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'note not found' })
    }

    const result = await note.deleteOne()

    const reply = `note '${result.title}' with id ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllnotes,
    createNewNote,
    updateNote,
    deleteNote
}