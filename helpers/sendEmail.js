const nodemailer = require('nodemailer');

const {META_PASS} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "oleksandr.korzun@meta.ua",
        pass: META_PASS
    }
}

const transporter = nodemailer.createTransport(nodemailerConfig);

module.exports = transporter;