const mongoose = require('mongoose');


let notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    }
},{timestamps: true})

module.exports = mongoose.model('Note', notesSchema)