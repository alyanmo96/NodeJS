const Jimp = require("jimp");//library for image proccess
(async function () {
    const image = await Jimp.read("images/img1.jpg");//get old image and read it
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
    image.write("images/edited-shapes.jpg"); 
})();