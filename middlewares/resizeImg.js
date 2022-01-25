const Jimp = require('jimp');

const resizeImg = async (req, res, next) =>{
    try {
        const {path: tempUpload} = req.file;
        await Jimp.read(`${tempUpload}`, (err, img) => {
            if (err) throw err;
            img.resize(250, 250).write(`${tempUpload}`);
            next();
          });
    } catch (error) {
        next(error)
    }
}


module.exports = resizeImg;
