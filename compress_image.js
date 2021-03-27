//npm install sharp --save
const sharp = require('sharp');

let inputFile  = "img.jpg";//image name, here image file in the same directory
let outputFile = "output.jpg";

sharp(inputFile).resize({ height: 1560, width: 1600 }).toFile(outputFile)
    .then(function(newFileInfo) {
        console.log("Success");
    })
    .catch(function(err) {
        console.log("Error occured");
    });  
    
    
