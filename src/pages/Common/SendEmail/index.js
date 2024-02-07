import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

export async function SendEmail(props) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.forwardemail.net',
        port: 465,
        secure: true,
        auth: {
          user: 'my_user',
          pass: 'my_password',
        },
      });
      
      const emailHtml = render(<p>Hello !! First Mail</p>);
      
      const options = {
        from: props.fromMail,
        to: props.toMail,
        subject: props.subjectMail,
        html: emailHtml,
      };
      
      await transporter.sendMail(options);
} 
