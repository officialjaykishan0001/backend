// server.js

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to handle CORS
app.use(cors());

// Create a Nodemailer transporter using your email service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'user.suport.0001@gmail.com',
        pass: 'ceysisofbqyrburx'  // Be careful with security; consider using environment variables
    }
});

// Endpoint to handle form submissions
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    // Email options
    const mailOptions = {
        from: email,
        to: 'user.suport.0001@gmail.com',
        subject: `Contact form submission from ${name}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            return res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
