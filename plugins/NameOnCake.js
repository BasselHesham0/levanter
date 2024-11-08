const { bot, textMaker } = require('../lib')
const Jimp = require('jimp'); // Import Jimp library for image processing
const path = require('path');
bot(
   {
      pattern: 'nasa ?(.*)', // Changed pattern to 'nasa'
      fromMe: true,
      desc: 'Add text to NASA image',
      type: 'textmaker',
   },
   async (message, match) => {
      if (!match) return await message.send('Please provide text to add to the image.');

      // Define the path to the base image
      const imagePath = path.join(__dirname, 'media/nasa.jpg'); // Ensure the image exists at this path

      try {
         // Load the base image
         const image = await Jimp.read(imagePath);

         // Load a bold, large font
         const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);

         // Set the text position: centered horizontally, and lower on the image
         const textX = image.bitmap.width / 2; // Center horizontally
         const textY = image.bitmap.height - 150; // Positioned above the bottom

         // Add the text to the image with the specified position and alignment
         image.print(
            font,
            textX,
            textY,
            {
               text: match, // Text provided by the user
               alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
               alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
            },
            image.bitmap.width,
            image.bitmap.height
         );

         // Convert the image to a buffer to send it directly
         const imageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

         // Send the modified image directly to the user
         await message.sendFromBuffer(imageBuffer, 'image/jpeg');
      } catch (error) {
         console.error('Error processing the image:', error);
         await message.send('Failed to add text to the image.');
      }
   }
);
bot(

	{		pattern: 'birthday ?(.*)',

		fromMe: true,

		desc: 'happy birthday',

		type: 'textmaker',

	},

	async (message, match) => {

		if (!match) return await message.sendMessage('Give me text')

		const effect_url =

			'https://en.ephoto360.com/write-name-on-red-rose-birthday-cake-images-462.html'

		const { status, url } = await textMaker(effect_url, match)

		if (url) return await message.sendFromUrl(url)

	}

)