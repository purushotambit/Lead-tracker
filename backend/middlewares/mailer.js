const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "kanikathapliyal123@gmail.com",
    pass: "xsmtpsib-1014e204735b7e785a0d26b1854dec13b950bc048cf2f7c010b2a1cde60232d5-H9qgMp2zkc3VAZ7R",
  },
});


const sendEmail = async (recipientEmail, firstName, subject) => {
  // Email template stored as a string
  const emailTemplateSource =
    `<!DOCTYPE html>
    <html>
    <head>
      <title>${subject}</title>
    </head>
    <body>
      <p>Hello ${firstName},</p>
      <p>This is the HTML content of the email.</p>
    </body>
    </html>`;

  // Compile the Handlebars template
  const emailTemplate = handlebars.compile(emailTemplateSource);

  // Generate HTML content by merging the template with dynamic data
  const htmlContent = emailTemplate({ firstName, subject });

  const mailOptions = {
    from: 'kanikathapliyal123@gmail.com',
    to: recipientEmail,
    subject: subject,
    html: htmlContent,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;