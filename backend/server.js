const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

// Routes
const slotRoute = require('./routes/slot')

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


dotenv.config();

// connect to database

mongoose.connect(
    process.env.ATLAS_URI,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('connected to mongo database')
)


// route middleware
app.use('/api/slot', slotRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server running at ${port}`)
})