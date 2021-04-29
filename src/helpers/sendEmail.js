const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const host = process.env.HOST;
const port = process.env.PORT_FRONTEND;
const link = `http://${host}:${port}`;
const email = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASS;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password
    // user: 'trykevin6@gmail.com', // generated ethereal user
    // pass: 'ayam1234', // generated ethereal password
  },
});

const send = (destination, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (type === "verify") {
        const info = await transporter.sendMail({
          from: email,
          to: destination,
          subject: "Account Verification",
          html: `Click this link to verify your account : <a href="${link}/auth/email=${destination}">Activate</a>`,
        });
        resolve(info);
      } else if (type === "forgot") {
        const info = await transporter.sendMail({
          from: email,
          to: destination,
          subject: "Reset Password",
          html: `Click this link to reset your password : <a href="${link}/forgot-password/?email=${destination}&token=${token}">Reset Password</a>`,
        });
        resolve(info);
      }
    } catch (error) {
      reject(error);
    }
  });
};


// const send = () =>{
//     return new Promise(async(resolve, reject)=>{
//         let info = await transporter.sendMail({
//             from: 'trykevin6@gmail.com', // sender address
//             to: 'kevinfaridap@gmail.com', // list of receivers
//             subject: "Hello ✔", // Subject line
//             text: "Hello world?", // plain text body
//             html: "<b>Hello world?</b>", // html body
//         });
//         resolve(info)
//     });
// };



module.exports = {
  send,
};
