const galleryModel = require("../model/gallerySchema.js");
const express = require("express");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//connection to Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }
    
    cloudinary.uploader.upload(req.file.path, async (error, result) => {
        if (error) {
            return res.status(500).send("Error uploading image");
        }
        
        const userEmail = req.body.userEmail;
        const galleryDoc = await galleryModel.findOne({email: userEmail});
        let gallery = galleryDoc.gallery;    
        gallery.push(result.url);
        console.log(userEmail+" "+result.url);

        try {
            await galleryDoc.save();
            res.send("Image uploaded successfully");
        } catch (error) {
            res.status(500).send("Error saving image URL to database");
        }
    });
}

const getGallery = async (req, res) => {
    try{
        const userEmail = req.body.userEmail;
        const galleryDoc = await galleryModel.findOne({email: userEmail});
        res.status(201).send(galleryDoc.gallery);  
    }catch(error){
        console.log(errpr);
        res.status(500).send("Something went wrong");
    }
}

module.exports = {uploadImage, getGallery};