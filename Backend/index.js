require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const PORT = 8000;

const mongoose = require('mongoose');
const { authRoute } = require('./routes/auth.router');
const {userRoute} = require('./routes/user.router');
const { movieRoute } = require('./routes/movie.router');

mongoose.connect(process.env.MONGO_DB)
.then(() => console.log("Database connection established successfully")).catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());
// const jwt = require('jsonwebtoken');

app.use(cors({
    origin : ["https://movie-streaming-app-frontend.vercel.app"],
    // origin : [""],
    methods : ['GET', 'POST', "DELETE"],
    credentials : true
}));

app.get('/', (req, res) => {
    res.send({
        error : false,
        message : "Api is getting ready"
    })
});


app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/movie', movieRoute);

app.listen(PORT, () => console.log("Live on http://localhost:"+ PORT));