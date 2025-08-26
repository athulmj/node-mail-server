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
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .email-card {
            width: 100%;
            max-width: 700px;
            background: #fff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            animation: fadeIn 0.6s ease-out;
        }
        
        .email-header {
            background: linear-gradient(135deg, #4776E6 0%, #8E54E9 100%);
            color: white;
            padding: 30px;
            text-align: center;
            position: relative;
        }
        
        .header-content {
            position: relative;
            z-index: 2;
        }
        
        .header-icon {
            width: 70px;
            height: 70px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 30px;
        }
        
        .email-header h2 {
            font-weight: 600;
            font-size: 26px;
            margin-bottom: 10px;
        }
        
        .email-header p {
            opacity: 0.9;
            font-size: 16px;
        }
        
        .header-decoration {
            position: absolute;
            bottom: -30px;
            left: 0;
            width: 100%;
            height: 60px;
            background: #fff;
            border-radius: 50% 50% 0 0;
        }
        
        .email-body {
            padding: 40px;
            background: #fff;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .info-card {
            background: #f8f9ff;
            border-radius: 12px;
            padding: 20px;
            border-left: 4px solid #4776E6;
            transition: transform 0.3s ease;
        }
        
        .info-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(71, 118, 230, 0.1);
        }
        
        .info-card .label {
            font-size: 14px;
            color: #777;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
        }
        
        .info-card .label i {
            margin-right: 8px;
            color: #4776E6;
        }
        
        .info-card .value {
            font-size: 18px;
            color: #333;
            font-weight: 500;
        }
        
        .message-section {
            margin-top: 10px;
        }
        
        .message-section .label {
            font-size: 14px;
            color: #777;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
        }
        
        .message-section .label i {
            margin-right: 8px;
            color: #4776E6;
        }
        
        .message-content {
            background: #f8f9ff;
            border-radius: 12px;
            padding: 20px;
            border-left: 4px solid #8E54E9;
            font-size: 16px;
            line-height: 1.6;
            color: #444;
        }
        
        .email-footer {
            background: #f5f7fa;
            padding: 25px;
            text-align: center;
            color: #777;
            font-size: 14px;
            border-top: 1px solid #eee;
        }
        
        .footer-links {
            margin-top: 10px;
            display: flex;
            justify-content: center;
            gap: 20px;
        }
        
        .footer-links a {
            color: #4776E6;
            text-decoration: none;
            transition: color 0.3s;
        }
        
        .footer-links a:hover {
            color: #8E54E9;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 650px) {
            .info-grid {
                grid-template-columns: 1fr;
            }
            
            .email-body {
                padding: 25px;
            }
            
            .email-header {
                padding: 25px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-card">
        <div class="email-header">
            <div class="header-content">
                <div class="header-icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <h2>New Contact Form Submission</h2>
                <p>You've received a new message from your website</p>
            </div>
            <div class="header-decoration"></div>
        </div>
        
        <div class="email-body">
            <div class="info-grid">
                <div class="info-card">
                    <div class="label">
                        <i class="fas fa-user"></i>
                        Name
                    </div>
                    <div class="value">${name}</div>
                </div>
                
                <div class="info-card">
                    <div class="label">
                        <i class="fas fa-envelope"></i>
                        Email Address
                    </div>
                    <div class="value">${email}</div>
                </div>
            </div>
            
            <div class="message-section">
                <div class="label">
                    <i class="fas fa-comment"></i>
                    Message
                </div>
                <div class="message-content">
                    <p>${message}</p>
                </div>
            </div>
        </div>
        
        <div class="email-footer">
            <p>This email was sent from your website's contact form. Please do not reply to this automated message.</p>
            <div class="footer-links">
                <a href="#">View in Browser</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Unsubscribe</a>
            </div>
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
