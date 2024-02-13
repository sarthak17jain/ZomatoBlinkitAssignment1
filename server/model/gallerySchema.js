const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    email: {
        type: String
    },
    gallery: []
});

let galleryModel = mongoose.model('gallery', gallerySchema);

module.exports = galleryModel;