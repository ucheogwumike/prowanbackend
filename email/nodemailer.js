const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.com",
  port: 465,
  secure: true,
  auth: {
  
    user: "info@prowan.ng",
    pass: "@ll0wm3n0W#$%",
  },
})

module.exports = {transporter};