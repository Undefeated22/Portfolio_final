const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define route to handle form submission
app.post('/submit_contact_form', (req, res) => {
    const { name, company, email, phone, project } = req.body;

    // Your nodemailer configuration
    const transporter = nodemailer.createTransport({
        // Configure transporter settings here
    });

    const mailOptions = {
        from: 'your-email@example.com',
        to: 'recipient@example.com',
        subject: 'Contact Form Submission',
        text: `
            Name: ${name}
            Company: ${company}
            Email: ${email}
            Phone: ${phone}
            Project: ${project}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Form submission failed' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Form submitted successfully' });
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
