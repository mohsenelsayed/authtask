const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const Posts = require('./models/Posts');
const Users = require('./models/Users');

const authRoute = require('./routes/Auth');
const postRoute = require('./routes/Post');
const userRoute = require('./routes/User');

const app = express();
dotenv.config({path : './config.env'});
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/auth', authRoute);
app.use('/post', postRoute);
app.use('/user', userRoute);





app.listen(3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})

mongoose.connect(process.env.DB_URI, {useUnifiedTopology: true, useNewUrlParser: true}, () => {
    console.log(`Connected to database!`);
});