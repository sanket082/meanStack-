const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
    try {
        // Make sure the username is not already taken
        let user = await userModel.find({username: req.body.username});

        // If the username is not taken, then register the new user, saving a hash of their password
        if (user != ''){
            res.status(422).send(null);
        } else {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            userModel.create(req.body);
            res.status(200).json(req.body);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("A server error occurred while attempting to register a new user.");
    }
}

// Login a user
const login = async (req, res) => {
    try {
        // Find and save the user underneath given username
        let user = await userModel.find({username: req.body.username});

        if (user != '') {
            // Authenticate the password given.
            const authenticated = await bcrypt.compare(req.body.password, user[0].password);

            if (authenticated) {
                const currTime = new Date(); // Save the current time
                const timeDipslacement = 3*60; // Determines how long the user's login session is valid (in minutes)
                const timeDisplacementString = "3 hours"; // String form of timeDisplacement

                // Create a signed token hashing together the user's id with the current time.
                const token = await jwt.sign({token: bcrypt.hash(user._id + currTime, 10)}, 'topsecret', {
                    expiresIn: timeDisplacementString
                });

                // Update the user model with the current login token and the session expiry date.
                await userModel.updateOne({username: req.body.username}, {'token': token});
                await userModel.updateOne({username: req.body.username}, {'tokenTime': new Date(currTime.getTime() + (60000 * timeDipslacement))});
                
                // Get the user with the updated information
                user = await userModel.find({username: req.body.username})

                // Send a cookie to the user which holds the token identifying the user's current session.
                res.cookie('token', token);
                // Send back the user data
                res.status(200).send(user);
            } else {
                res.status(422).send(null);
            }            
        } else {
            res.status(422).send(null);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("A server error occurred while attempting to login.");
    }
}

module.exports = { register, login };