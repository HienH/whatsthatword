const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// use env config
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// Connect to mongoose
mongoose.connect(process.env.DATABASE);
mongoose.connection.on('connected', () => {
    console.log('Connected to MONGO DB: ' + process.env.DATABASE)
});
mongoose.connection.on('error', (error) => {
    console.log('MONGO DB connection error: ' + error)
});

app.use(cors());
app.use(bodyParser.json());

// Routers
const userRouter = require('./server/routes/user.router');
const wordRourer = require('./server/routes/word.router');

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./server/middleware/passport')(passport);

app.use('/user', userRouter);
app.use('/word', wordRourer);

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
}); 