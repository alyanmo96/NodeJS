const Jimp = require("jimp");//library for image proccess
(async function () {
    const image = await Jimp.read("images/imgage.jpg");//get old image and read it.........on read(path+name of image file)
    /**
     * Add text to image
     */
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    image.print(font, 0, 0, 'Hello world!');
    /**
     * resize image
     */
    image.resize(150, 150);//for profile image. 150*150 we can change it for any size we need
    
    /**
     * Image filters
     */
    //image.sepia();//make image brown
    //image.gaussian(1);//blur image
    //image.blur(1);// more blurer
    //image.invert();//red and blue 
    //image.greyscale();//gray image
    await fs.remove("images/image.jpg");//remove the old image
    image.write("images/image.jpg"); // the new image on the same path with the old name
})();
