const Jimp = require("jimp");
const path = require("path");

const imageUploader = async (image, res, size) => {
  if (image) {
    // upload image
    const buffer = Buffer.from(
      image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

    try {
      const jimpResp = await Jimp.read(buffer);
      jimpResp
        .resize(size, Jimp.AUTO)
        .write(path.resolve(__dirname, `../public/storage/${imagePath}`));
      return imagePath;
    } catch (err) {
      return res.status(500).json({
        error: "Could not process the image!!",
      });
    }
  }
};

module.exports = imageUploader;
