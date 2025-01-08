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
    const { name, email, checkin, checkout, adult, child, room, message } = req.body;

    // Validation of form fields (ensure required fields are present)
    if (!name || !email || !checkin || !checkout || !adult || !child || !room) {
        return res.status(400).send('All fields are required.');
    }

    // Render the email template for the admin
    ejs.renderFile(path.join(__dirname, '../views/emails/bookingAdminEmail.ejs'), { name, email, checkin, checkout, adult, child, room, message }, (err, adminEmailHtml) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error rendering admin email');
        }

        // Define the admin's email options
        const adminMailOptions = {
            from: email,
            to: 'kgotatsomohlala0@gmail.com',  // admin's email address
            subject: `New Booking Request: ${name}`,
            html: adminEmailHtml
        };

        // Send the email to the admin
        transporter.sendMail(adminMailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error sending email to admin');
            }
            console.log('Admin email sent: ' + info.response);
        });
    });

    // Render the email template for the client
    ejs.renderFile(path.join(__dirname, '../views/emails/bookingClientEmail.ejs'), { name, email, checkin, checkout, adult, child, room, message }, (err, clientEmailHtml) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error rendering client email');
        }

        // Define the client's email options
        const clientMailOptions = {
            from: 'moruditech@gmail.com',  // Sender is the admin's email
            to: email,  // Client's email address
            subject: `Eagles View Booking Confirmation`,
            html: clientEmailHtml
        };

        // Send the email to the client
        transporter.sendMail(clientMailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error sending email to client');
            }
            console.log('Client email sent: ' + info.response);

            // Redirect to the booking page after success
            res.redirect('/bookings#submissionToast');
        });
    });
};
