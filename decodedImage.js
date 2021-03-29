import fs from 'fs';
import * as tf from '@tensorflow/tfjs-node';
import * as mobilenet from '@tensorflow-models/mobilenet';

const imageToDecode = `${__dirname}/assets/5.jpg`;

const image = fs.readFileSync(imageToDecode);
const decodedImage = tf.node.decodeImage(image,3);

async function decodedFunction(){
    const model = await mobilenet.load();
    const predictions = await model.classify(decodedImage);
    console.log(`Predictions: ${JSON.stringify(predictions,undefined,2)}`);
}

decodedFunction();

/*
npm i -D @babel/core @babel/node @babel/preset-env
touch .babelrc
// on babelrc file what to write 
          "
            {
                "presets": ["@babel/preset-env"]
            }
          "

touch decodedImage.js
npm i @tensorflow-models/mobilenet @tensorflow/tfjs-node

*/
