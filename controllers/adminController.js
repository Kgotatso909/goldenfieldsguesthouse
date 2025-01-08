const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'moruditech@gmail.com',  // Use environment variables for security
        pass: 'yrhh wzzz vfwv obri',
    },
});

// Handle sending the email for admin
exports.sendAdminEmail = (req, res) => {
    const { recipientEmail, subject, message } = req.body;

    // Render the email template for the admin
    ejs.renderFile(path.join(__dirname, '../views/emails/emailTemplate.ejs'), { message }, (err, emailHtml) => {
        if (err) {
            console.log('Error rendering email template:', err);
            return res.status(500).send('Error preparing email');
        }

        const mailOptions = {
            from: 'moruditech@gmail.com',  // Sender is the admin's email
            to: recipientEmail,  // Recipient email
            subject: subject,
            html: emailHtml,  // Email body rendered from the template
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                // Send a success message to show the toast
                res.render('adminEmail', { successMessage: 'Email sent successfully!' });
            }
        });
    });
};
