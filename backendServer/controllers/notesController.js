// Imports
const { notesModel } = require('../models/notesModel');
const userModel = require('../models/userModel');

// Validate the user with a hashed login token
const validateUser = async (curToken) => {
    const user = await userModel.find({token: curToken});

    // If the token given is valid, then return the user data from the database.
    if (user.length > 0 && user[0].tokenTime >= new Date()){
        return user[0];
    }

    // If the token is invalid, then return nothing.
    return null;
}

// Enter a new note into the database
const enterNote = async (req, res) => {
    try {
        // Validate the user through the token passed by the client in the header
        const user = await validateUser(req.headers['token']);

        if (user) {
            // Create the new note data and send back an ok status as well as the body of the new note.
            req.body.userId = user._id;
            const data = await notesModel.create(req.body);
            res.status(200).send(req.body);
        } else {
            res.status(400).send("User session invalid.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred while creating a note with given data.");
    }
};

// Get all notes owned by the given user
const getNotesByUserToken = async (req, res) => {
    // Validate the user through the token passed by the client in the header
    const user = await validateUser(req.headers['token']);

    if (user) {
        // Get and return all notes with the user's id
        const notes = await notesModel.find({userId: user._id});
        res.status(200).send(notes);
    } else {
        res.status(400).send("User session invalid.");
    }
}

// Get 3 most recent notes
const getRecentNotes = async (req, res) => {
    try {
        // Validate the user through the token passed by the client in the header
        const user = await validateUser(req.headers['token']);

        if (user) {
            // Find all notes under the user id, sort them by date newest to oldest, and then take the first 3
            const data = await notesModel.find({userId: user._id}).sort({'dateCreated': -1}).limit(3);
            res.status(200).send(data);
        } else {
            res.status(400).send("User session invalid.");
        }
    } catch (err) {
        res.status(500).send("Error occurred while attempting to get recent notes.");
    }
};

// Get all important notes
const getImportantNotes = async (req, res) => {
    try {
        // Validate the user through the token passed by the client in the header
        const user = await validateUser(req.headers['token']);

        if (user) {
            // Find all notes under given user that are also marked with the important flag
            const data = await notesModel.find({userId: user._id, important: true});
            res.status(200).send(data);
        } else {
            res.status(400).send("User session invalid.");
        }
    } catch (err) {
        res.status(500).send("Error occured while trying to get important notes.");
    }
};

// Get notes created on passed date
const getNotesOnDate = async (req, res) => {
    try {
        // Validate the user through the token passed by the client in the header
        const user = await validateUser(req.headers['token']);

        if (user) {
            // Create a new date object using the date string passed in the body.
            // Note that this date will be at the very start of the day, with no hours, minutes, or seconds.
            // Also create a future date wich adds 24 hours to the date variable.
            let date = new Date(req.body.date);
            let futureDate = new Date(date.getTime() + (24*60*60*1000));

            // Check for any user owned notes whose created date fall within the dates created above.
            const result = await notesModel.find({userId: user._id, dateCreated: {"$gte": date, "$lt": futureDate}});
            
            // Return the notes that were made anytime on the given day.
            if (result != "") {
                res.status(200).send(result);
            } else {
                res.status(400).send("No note with the given date was found.");
            }
        } else {
            res.status(400).send("User session invalid.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred while attempting to get note with specified date.");
    }
};

// Update note body
const updateNote = async (req, res) => {
    try {
        // Validate the user through the token passed by the client in the header
        const user = await validateUser(req.headers['token']);

        if (user) {    
            // Get the id field from the body and then delete it so that the database does not attempt
            // to update a note's non-existing 'id' field.  
            const noteId = req.body.id;
            delete req.body.id;
            
            // Make sure the note belongs to the user before updating it
            let result = await notesModel.findById(noteId);
            if (result.userId != user._id){
                res.status(400).send("No owned note under this id.");
            }

            // Find and update the note, saving the updated document 
            result = await notesModel.findByIdAndUpdate(noteId, req.body, {new: true});

            // If any update occurred, then send the result.
            if (result != null) {
                res.status(200).send(result);
            } else {
                res.status(400).json("No update occurred for given note.");
            }
        } else {
            res.status(400).send("User session invalid.");
        }
    } catch (err) {
        res.status(500).send("Error while attempting to update note with specified body and id.");
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        // Validate the user through the token passed by the client in the header
        const user = await validateUser(req.headers['token']);

        if (user) {
            // Make sure the note belongs to the user before deleting it
            let result = await notesModel.findById(req.body.id);
            if (result.userId != user._id){
                throw new Error("Note belongs to a different user.")
            }

            // Delete the note and return the result.
            result = await notesModel.findByIdAndDelete(req.body.id, {new: true});
            if (result != null) {
                res.status(200).send(result);
            } else {
                res.status(400).send("Could not find note with given id.");
            }
        } else {
            res.status(400).send("User session invalid.");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error while attempting to delete note with specified id.");
    }
}

module.exports = {enterNote, getNotesByUserToken, getRecentNotes, getImportantNotes,
                  getNotesOnDate, updateNote, deleteNote};