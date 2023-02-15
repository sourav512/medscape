const nodemailer = require("nodemailer");

const mailHelper = async (option) => {
  var transporter = nodemailer.createTransport({
    service:process.env.SERVICE,
    host:process.env.SMTP,
    secureConnection: false,
    tls:{
      rejectUnauthorized: false,
    },
    port:465,
    auth:{
      user:process.env.USER,
      pass:process.env.PASS
    }
  });

  const message = {
    to: option.email, 
    subject: option.subject, 
    text: option.message, 
  };

  await transporter.sendMail(message);
};

module.exports = mailHelper;
