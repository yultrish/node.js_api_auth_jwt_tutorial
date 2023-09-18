const express = require('express');
const app = express();
require("dotenv").config(); 
const mongoose = require('mongoose');
// Import routes
const authRoute = require('./routes/auth');

mongoose
  .connect(process.env.DB_CONNECTED, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  })


// Routes Middleware
app.use(express.json())
app.use('/api/user', authRoute);



const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Port ${PORT} is running`);
});




