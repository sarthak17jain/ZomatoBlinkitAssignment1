const express = require('express');
const multer = require('multer');
const { uploadImage, getGallery } = require('../controller/image-controller.js');

// // Configure Multer for file uploads
// const upload = multer({ dest: "uploads/" });

// Configure Multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

const imageRouter = express.Router();

imageRouter.post('/uploadImage', upload.single('image'), uploadImage);
imageRouter.post('/getGallery', getGallery);

module.exports = imageRouter;