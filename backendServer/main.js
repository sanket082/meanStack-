// Imports
const express = require('express');
const mongoose = require('mongoose');
const notesRouter = require('./routes/notesRouter');
const userRouter = require('./routes/usersRouter');
const cookieParser = require('cookie-parser');

// Constants
const app = express();
const port = 3000;
const dbName = "notes";
const connection = "mongodb://127.0.0.1:27017/"+dbName;

// Set the server's use statements
app.use(express.json());
app.use((req,res,next)=>{
    // Only the server on localhost:4200 will have access to the origin, headers, and credentials
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, token', 'Application/JSON, *') // Allow certain headers
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
});
app.use(cookieParser());
app.use(notesRouter);
app.use(userRouter);

// Start the server
app.listen(port, () => {
    console.log("Connected to server on port "+port+".");
});

// Connect to the database
mongoose.connect(connection, (err) => {
    if (err) throw err;
    console.log("Database connection established through: "+connection);
})

