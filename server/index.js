const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');
// import { v4 as uuid } from 'uuid';
const authRouter = require('./routes/authRouter.js');
const imageRouter = require('./routes/imagesRouter.js');

const app = express();
console.log()
const PORT = process.env.PORT || 8000;
const db_link = process.env.DB_LINK;
console.log(process.env.PORT);
console.log(process.env.CLIENT_URL);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
//cors with options credentials: true and origin: .. is required for cookie to be sent and received 
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
//we use middleware function for cookieParser so that we can access our cookies from anywhere
app.use(cookieParser());

mongoose.set('strictQuery', true);

mongoose.connect(db_link)
.then(function(db){
    console.log('db connected');
    app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
})
.catch(function(err){
    console.log(err);
});


app.use('/auth', authRouter);
app.use('/image', imageRouter);

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'public/build' ));
    console.log(__dirname);
    console.log(path.join(__dirname, 'public', 'build', 'index.html'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'build', 'index.html')); // relative path
    });
}
