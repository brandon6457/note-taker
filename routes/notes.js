const note = require('express').Router();
const { json } = require('express');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/utils');
const uuid = require('../helpers/uuid');

note.get('/', (req, res) => {
   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

note.post('/', (req, res) => {
   const { title, text } = req.body;
   if (req.body) {
      const newNote = {
         id : uuid(),
         title,
         text
      };
      readAndAppend(newNote, './db/db.json');
      res.json(`Note was added successfully`);
   } else {
      res.error(`There was an error adding the note`);
   }
});

note.delete('/:id', (req, res) => {
   const id = req.params.id;
   readFromFile('./db/db.json').then((data) => {
      const newData = JSON.parse(data);
      const results = newData.filter((note) => {
         return note.id !== id
      });

      writeToFile('./db/db.json', results);
      res.json(`You have successfully deleted note of ${id}`)
   })
});

module.exports = note;