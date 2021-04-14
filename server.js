// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
let dbfile = require('./db/db.json')
const uniqid = require('uniqid');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// Basic routing for html serving
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));


// Retrieves db.json file for note display
app.get('/api/notes', (req, res) => {
    
    return res.json(dbfile);
});

// Create New Note - takes in JSON input
app.post('/api/notes', (req, res) => {

    const newNote = req.body;
    newNote.id = uniqid()

    dbfile.push(newNote);
    noteString = JSON.stringify(dbfile);

    fs.writeFile('./db/db.json', noteString, (err) =>
    err ? console.error(err) : console.log('Success!')
    );

    res.json(noteString);
});

// Takes in specific note for deletion with note id and rewrites db.json
app.delete('/api/notes/:id', (req, res)  => {
 
    let id = req.params.id ;
    console.log(id)

    dbfile = dbfile.filter(note => note.id !== id ) 
    noteString = JSON.stringify(dbfile);

    fs.writeFile('./db/db.json', noteString, (err) =>
    err ? console.error(err) : console.log('Success!')
    );

    return res.send("Removed");
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));