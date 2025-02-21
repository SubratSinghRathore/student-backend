require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
//const bodyParse = require("body-parser")
const router = require('./routes.js');
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH',
    allowedHeaders: 'Content-Type, Authorization'
}))

app.use(express.json());

app.use('/', router);


app.listen(PORT, console.log(`Listening on port ${PORT}`));
