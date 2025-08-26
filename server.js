const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  // const mailOptions = {
  //   from: email,
  //   to: process.env.GMAIL_USER,
  //   subject: `Message from ${name}`,
  //   text: message
  // };

  const mailOptions = {
  from: process.env.GMAIL_USER, // must match authenticated Gmail
  to: process.env.GMAIL_USER,   // your inbox
  subject: `Message from ${name}`,
  // text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  html: `
    // <div style="background:#f9f9f9;padding:20px;font-family:sans-serif;border:1px solid #ddd;">
    //   <h2 style="color:#333;">📩 New Contact Form Submission</h2>
    //   <p><strong>Name:</strong> ${name}</p>
    //   <p><strong>Email:</strong> ${email}</p>
    //   <p><strong>Message:</strong></p>
    //   <div style="background:#fff;padding:15px;border-radius:5px;border:1px solid #ccc;">
    //     <p>${message}</p>
    //   </div>
    // </div>

    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f7f9;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background: linear-gradient(135deg, #4a6fa5 0%, #2c3e50 100%);
            color: white;
            padding: 25px 30px;
            text-align: center;
        }
        .email-header h2 {
            margin: 0;
            font-weight: 600;
            font-size: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .email-header h2 svg {
            margin-right: 10px;
        }
        .email-body {
            padding: 30px;
        }
        .field-group {
            margin-bottom: 20px;
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 15px;
        }
        .field-group:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        .field-label {
            font-weight: 600;
            color: #555;
            font-size: 14px;
            margin-bottom: 5px;
            display: block;
        }
        .field-value {
            color: #333;
            font-size: 16px;
            margin: 0;
        }
        .message-container {
            background: #f8f9fa;
            border-left: 4px solid #4a6fa5;
            padding: 15px;
            border-radius: 4px;
            margin-top: 10px;
        }
        .message-container p {
            margin: 0;
            line-height: 1.6;
            color: #444;
        }
        .email-footer {
            background: #f5f7f9;
            padding: 20px 30px;
            text-align: center;
            font-size: 12px;
            color: #777;
            border-top: 1px solid #eaeaea;
        }
        .email-footer a {
            color: #4a6fa5;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h2>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19 18H5C4.45 18 4 17.55 4 17V8L10.94 12.34C11.59 12.75 12.41 12.75 13.06 12.34L20 8V17C20 17.55 19.55 18 19 18ZM12 11L4 6H20L12 11Z" fill="white"/>
                </svg>
                New Contact Form Submission
            </h2>
        </div>
        
        <div class="email-body">
            <div class="field-group">
                <span class="field-label">Name</span>
                <p class="field-value">${name}</p>
            </div>
            
            <div class="field-group">
                <span class="field-label">Email Address</span>
                <p class="field-value">
                    <a href="mailto:${email}" style="color: #4a6fa5; text-decoration: none;">${email}</a>
                </p>
            </div>
            
            <div class="field-group">
                <span class="field-label">Message</span>
                <div class="message-container">
                    <p>${message}</p>
                </div>
            </div>
        </div>
        
        <div class="email-footer">
            <p>This email was sent from your website's contact form. Please do not reply to this automated message.</p>
            <p>© 2023 Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `,
  replyTo: email // this sets the user's email for reply
};

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (err) {
    res.status(500).send("Failed to send email");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
