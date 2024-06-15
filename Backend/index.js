require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

const mongoose = require('mongoose');
const { authRoute } = require('./routes/auth.router');

mongoose.connect(process.env.MONGO_DB)
.then(() => console.log("Database connection established successfully")).catch((err) => console.log(err));

app.use(express.json());

// const jwt = require('jsonwebtoken');

app.use(cors({
    origin : '*',
}));

app.get('/', (req, res) => {
    res.send({
        error : false,
        message : "Api is getting ready"
    })
});


app.use('/api/auth', authRoute);

app.listen(PORT, () => console.log("Live on http://localhost:"+ PORT));