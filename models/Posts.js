const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        min: 5
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now()
    }

});

module.exports = mongoose.model("Posts", postSchema);
