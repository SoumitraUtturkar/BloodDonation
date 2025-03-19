const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // ✅ Bypass SSL verification
      },
    });

    let info = await transporter.sendMail({
      from: 'RaktVahini',
      to: email, // ✅ Fixed syntax
      subject: title, // ✅ Fixed syntax
      html: body, // ✅ Fixed syntax
    });

    console.log("Email sent:", info);
    return info;
  } catch (e) {
    console.error(`Failed to send email to ${email}:`, e.message); // ✅ Fixed syntax
    return;
  }
};

module.exports = mailSender;
