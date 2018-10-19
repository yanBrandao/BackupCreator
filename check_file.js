var fs = require("fs");
const path = require('path')

const folderPath = 'C:/Users/yan.diniz/Documents/Directory'




var date = new Date();
var data = fs.readdirSync(folderPath).toString() + "\n";//date.getDate().toString() + "\n";

// Create a writable stream
var writerStream = fs.createWriteStream('output.txt', {'flags': 'a'});

// Write the data to stream with encoding to be utf8
writerStream.write(data,'UTF8');

// Mark the end of file
writerStream.end();

// Handle stream events --> finish, and error
writerStream.on('finish', function() {
   console.log("Write completed.");
});

writerStream.on('error', function(err) {
   console.log(err.stack);
});

console.log("Program Ended");