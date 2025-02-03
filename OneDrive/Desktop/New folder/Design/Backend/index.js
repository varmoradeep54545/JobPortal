const express = require('express');
const app = express();
const connectDB = require("./db");
const dotenv = require('dotenv');

const applicationRoute = require('./routes/applicationRoute');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;

const cors = require('cors')
app.use(cors())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.json())
app.use('/api', applicationRoute);
dotenv.config();
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});