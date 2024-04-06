require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const Jobs = require('./models/JobSchema');

app.use(bodyParser.json());
app.use(cors());

// Database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});


//Available Routes
app.use(`/.netlify/functions/server/api/auth/admin`, require('./routes/admin/auth'));
app.use(`/.netlify/functions/server/api/jobs`, require('./routes/job/jobOperation'));



// SERVER - LISTENING
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports.handler = serverless(app);