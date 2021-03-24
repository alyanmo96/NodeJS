const Jimp = require("jimp");
const fs = require("fs-extra");
const pathToFfmpeg = require("ffmpeg-static");
const util = require('util');

const exec = util.promisify(require('child_process').exec);

const videoEncoder = 'h264';
const inputFile = 'input.mp4';//name of old video
const outputFile = 'output.mp4';//name of new one

const inputFolder = 'temp/raw-frames';
const outputFolder = 'temp/edited-frames';

let currentProgress = 0;

(async function () {
    try {
        //create folder to save video as images...going to delete it later
        await fs.mkdir('temp');
        await fs.mkdir(inputFolder);
        await fs.mkdir(outputFolder);
        await exec(`"${pathToFfmpeg}" -i ${inputFile} -vf scale=720:-1 ${inputFolder}/%d.png`);
        const frames = fs.readdirSync(inputFolder);

        for(let frameCount = 1; frameCount <= frames.length; frameCount++) {
            let frame = await Jimp.read(`${inputFolder}/${frameCount}.png`);
            frame = await modifyFrame(frame);            
            await frame.writeAsync(`${outputFolder}/${frameCount}.png`);//save as image
        }
        //Encode video from PNG (images) frames to video without sound
        await exec(`"${pathToFfmpeg}" -start_number 1 -i ${outputFolder}/%d.png -vcodec ${videoEncoder} -pix_fmt yuv420p temp/no-audio.mp4`);
        //Copy audio from original video
        await exec(`"${pathToFfmpeg}" -i temp/no-audio.mp4 -i ${inputFile} -c copy -map 0:v:0 -map 1:a:0? ${outputFile}`);
        await fs.remove('temp');//Remove temp folder
    } catch (error) {
        console.log('the error',error);
    }
})();

const modifyFrame = async (frame)=>{
   // let newHeight = 16 * frame.bitmap.width / 9;
    let newHeight = 4 * frame.bitmap.width / 3;
    newHeight = newHeight % 2 === 0 ? newHeight : (newHeight + 1);
    const newImage = new Jimp(frame.bitmap.width, newHeight, 'white');//Create new image width current width, new height and white background

    // Add words to images
    //const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    //newImage.print(font, 20, newImage.bitmap.height - 100, '@challenge');
    newImage.composite(frame, 0, (newHeight / 2) - (frame.bitmap.height / 2));
    return newImage;
}