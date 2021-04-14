// Dependencies

const express = require('express');
const path = require('path');
const fs = require('fs');
const dbfile = require('./db/db.json')
const uniqid = require('uniqid');



// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));



// Displays a single character, or returns false
app.get('/api/notes', (req, res) => {
    
    return res.json(dbfile);
});


// Create New Characters - takes in JSON input
app.post('/api/notes', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newNote = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newNote.routeName = newNote.name.replace(/\s+/g, '').toLowerCase();

    
    newNote.id = uniqid()
    
    dbfile.push(newNote);
    console.log(dbfile)

    noteString = JSON.stringify(dbfile);


    fs.writeFile('./db/db.json', noteString, (err) =>
    err ? console.error(err) : console.log('Success!')
    );

    // console.log(newNote);
    // console.log(noteString);
    // console.log(dbfile)
    

    // console.log(dbfile)
    res.json(noteString);
});





app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
