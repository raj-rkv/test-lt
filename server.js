const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const compression = require('compression');

dotenv.config();
const app = express();
const PORT = 3000;

// Middleware
app.use(compression()); 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/send', async (req, res) => {
    const {
        name,
        email,
        CountryCode,
        mobile,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        active_url,
        agree
    } = req.body;


    if (
        !name ||
        !email ||
        !CountryCode ||
        !mobile ||
        // !utm_source ||
        // !utm_medium ||
        // !utm_campaign ||
        // !active_url ||
        agree !== 'on'
    ) {
        return res.status(400).json({
            success: false,
            message: 'All required fields must be filled and agreement accepted.',
        });
    }


    //sending data via webhook
    const postData = {
        name: name,
        email: email,
        country_code: CountryCode,
        mobile: mobile,
        message: "NA",
        landing_page_url: "https://lnthousing.com",
        active_page_url: "https://lnthousing.com",
        opt_in: true,
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: utm_campaign,
        utm_term: utm_term
    };

    const apiUrl = process.env.WEBHOOK;
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            console.error('API Error:', response.statusText);
        } else {
            const text = await response.text(); 
            try {
                const data = JSON.parse(text);
                console.log('Response:', data);
            } catch (e) {
                console.log('Response:', text);
            }
        }
    } catch (err) {
        console.error('Fetch error:', err);
    }



    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const message = `
      <h2>Dear Team,</h2>
      <p>Please find the below details:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Contact Number:</strong> ${CountryCode}${mobile}</li>
        <li><strong>UTM Source:</strong> ${utm_source}</li>
        <li><strong>UTM Medium:</strong> ${utm_medium}</li>
        <li><strong>UTM Campaign:</strong> ${utm_campaign}</li>
        <li><strong>UTM Term:</strong> ${utm_term}</li>
      </ul>
      <p><b>Team Royalti</b><br>lnthousing.com</p>
    `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.TO_EMAIL1,
            subject: 'Landing Page Lead - Inquiry',
            html: message,
        });


        // res.status(200).json({ success: true, message: 'Email sent successfully!' });
        res.redirect('/thank-you.html');
    } catch (err) {
        console.error('Error sending email:', err);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }

    // try {
    //     const transporter = nodemailer.createTransport({
    //         service: 'gmail',
    //         auth: {
    //             user: process.env.EMAIL_USER,
    //             pass: process.env.EMAIL_PASS,
    //         },
    //     });

    //     const message = `
    //    <h2>Dear ${name},</h2> 
    //         <p>We have received your inquiry, we will soon get back to you.</p> 
	// 		<br>
    //         <p><b>Team Royalti</b><br>
    //         thewadhwacourtyard.in</p> `;

    //     await transporter.sendMail({
    //         from: process.env.EMAIL_USER,
    //         to: email,
    //         subject: 'Customer - Response',
    //         html: message,
    //     });
    //     // res.status(200).json({ success: true, message: 'Email sent successfully!' });
    //     res.redirect('/thank-you.html');
    // } catch (err) {
    //     console.error('Error sending email:', err);
    //     res.status(500).json({ success: false, message: 'Failed to send email' });
    // }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


