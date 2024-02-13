const express = require('express');
const multer = require('multer');
const { uploadImage, getGallery } = require('../controller/image-controller.js');

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

const imageRouter = express.Router();

imageRouter.post('/uploadImage', upload.single('image'), uploadImage);
imageRouter.post('/getGallery', getGallery);

module.exports = imageRouter;