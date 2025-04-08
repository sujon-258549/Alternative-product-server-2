import nodemailer from 'nodemailer';
import config from '../../config';
export const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
    auth: {
      user: 'mdsujon258549@gmail.com',
      pass: 'zxyr hvfh yhat mree',
    },
  });
  await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });
};
