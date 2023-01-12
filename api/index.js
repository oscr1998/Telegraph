require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors().SetIsOriginAllowed(origin => true));
app.use(express.json());

const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

const routes = require('./routes/routes');
app.use('/api', routes)

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})


