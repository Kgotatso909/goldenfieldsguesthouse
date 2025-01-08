const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'moruditech@gmail.com',  // Your email here
        pass: 'yrhh wzzz vfwv obri'  // Your app password here
    }
});

// Handle sending the email
exports.sendEmail = (req, res) => {
    const { name, email, subject, message } = req.body;

    // Render the email template for the owner
    ejs.renderFile(path.join(__dirname, '../views/emails/ownerEmail.ejs'), { name, email, subject, message }, (err, ownerEmailHtml) => {
        if (err) {
            console.log(err);
            return res.send('Error rendering owner email');
        }

        // Define the owner's email options
        const ownerMailOptions = {
            from: email,
            to: 'kgotatsomohlala0@gmail.com',  // Owner's email address
            subject: `New contact message: ${subject}`,
            html: ownerEmailHtml
        };

        // Send the email to the owner
        transporter.sendMail(ownerMailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.send('Error sending message');
            }
            console.log('Owner email sent: ' + info.response);
        });
    });

    // Render the email template for the client
    ejs.renderFile(path.join(__dirname, '../views/emails/clientEmail.ejs'), { name, message }, (err, clientEmailHtml) => {
        if (err) {
            console.log(err);
            return res.send('Error rendering client email');
        }

        // Define the client's email options
        const clientMailOptions = {
            from: 'moruditech@gmail.com',  // Sender is the owner's email
            to: email,  // Client's email address
            subject: `Thank you for contacting us: ${subject}`,
            html: clientEmailHtml
        };

        // Send the email to the client
        transporter.sendMail(clientMailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.send('Error sending message to client');
            }
            console.log('Client email sent: ' + info.response);

            // Redirect to the contact page after success
            res.redirect('/contact#submissionToast');
        });
    });
};

