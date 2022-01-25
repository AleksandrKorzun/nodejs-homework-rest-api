const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');
const { User } = require('../../model/user');


const avatarDir = path.join(__dirname, "../../", "public", "avatars")

const setAvatar = async (req, res, next) => {
    const {_id: id} = req.user;
    const {path: tempUpload, originalname} = req.file;
    try {
          const [ext] = originalname.split(".").reverse();
          const fileName = `${id}.${ext}`;
          const resUpload = path.join(avatarDir, fileName);
          console.log(resUpload)
        await fs.rename(tempUpload, resUpload, () => {
            console.log("\nFile Renamed!\n")});
        const avatarURL = `/avatars/${fileName}`;
        await User.findByIdAndUpdate(id, {avatarURL})
        res.json({
            Status: "200 OK",
            "Content-Type": "application/json",
            ResponseBody: {
                avatarURL
            }
        })
    } catch (error) {
        await fs.unlink(tempUpload);
        res.json({
            Status: "401 Unauthorized",
            "Content-Type": "application/json",
            ResponseBody: {
                message: "Not authorized"
            }
        })
        
    }
}

module.exports = setAvatar;