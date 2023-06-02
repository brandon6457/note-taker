const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
fs.writeToFile(destination, JSON.stringify(content, null, 4), (err) =>
err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

const readAndAppend = (content, file) => {
   fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
         console.error(err);
      } else {
         const parseData = JSON.parse(data);
         parsedData.push(content);
         writeToFile(file, parsedData);
      }
   });
};

module.exports = { readFromFile, writeToFile, readAndAppend };