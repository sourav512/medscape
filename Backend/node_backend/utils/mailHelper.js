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
    html:`<div style="font-family: 'Courier New', Courier, monospace;text-align: center;margin:0;padding:6px;width: 100%; height: 150px;border:2px solid rgb(87, 93, 255);    border-radius: 12px;box-sizing: border-box;display: block;">
    <div style="font-size: 1.5rem;font-weight: 600;">Reset Password</div>
    <div style="margin-top: 1rem;">Click the below link to reset the password</div>
    <a href="${option.link}" style="font-weight: 600;text-decoration: none;border-radius:12px;color: white;padding: 12px 16px;background-color: rgb(87, 93, 255);bottom: 0;/* width: 50%; *//* text-align: center; */display: block;margin-top: 1rem;">Reset Password</a>
</div>`
  };

  await transporter.sendMail(message);
};

module.exports = mailHelper;
