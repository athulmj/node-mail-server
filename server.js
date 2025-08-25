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
    <div style="background:#f9f9f9;padding:20px;font-family:sans-serif;border:1px solid #ddd;">
      <h2 style="color:#333;">📩 New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <div style="background:#fff;padding:15px;border-radius:5px;border:1px solid #ccc;">
        <p>${message}</p>
      </div>
    </div>
  `
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
