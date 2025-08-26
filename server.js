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
</head>

<body style="margin: 0; padding: 0; background-color: #f5f7fa; font-family: Arial, sans-serif;">
    <!-- MAIN CONTAINER TABLE -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f5f7fa">
        <tr>
            <td align="center" style="padding: 20px;">
                <!-- CARD TABLE -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff"
                    style="max-width: 700px; border-radius: 8px; box-shadow: 0 3px 10px rgba(0,0,0,0.05); border-radius: 30px;">
                    <!-- HEADER SECTION -->
                    <tr>
                        <td align="center" bgcolor="#4776E6"
                            background="https://img.freepik.com/free-vector/gradient-blue-background_23-2149333532.jpg"
                            style="background: linear-gradient(to right, #4776E6, #8E54E9); padding: 30px 20px; position: relative; border-top-left-radius: 30px; border-top-right-radius: 30px;">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding-bottom: 20px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="70" height="70"
                                            style="background-color: rgba(255,255,255,0.2); border-radius: 50%;">
                                            <tr>
                                                <td align="center" style="color: #ffffff; font-size: 30px;">
                                                    ✉
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center"
                                        style="color: #ffffff; font-size: 26px; font-weight: bold; font-family: Arial, sans-serif;">
                                        New Contact Form Submission
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center"
                                        style="color: #ffffff; font-size: 16px; padding-top: 10px; font-family: Arial, sans-serif;">
                                        You've received a new message from your website
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- BODY CONTENT -->
                    <tr>
                        <td align="center" style="padding: 40px 30px 30px 30px;">
                            <!-- INFO GRID -->
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <!-- NAME CARD -->
                                    <td width="50%" align="center" valign="top" style="padding-bottom: 20px;">
                                        <table width="90%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f8f9ff"
                                            style="border-radius: 8px; border-left: 4px solid #4776E6;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td
                                                                style="color: #777777; font-size: 14px; padding-bottom: 8px; font-family: Arial, sans-serif;">
                                                                <span style="color: #4776E6;"><i class="fas fa-user"></i></span> Name
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style="color: #333333; font-size: 18px; font-weight: bold; font-family: Arial, sans-serif;">
                                                                ${name}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    <!-- EMAIL CARD -->
                                    <td width="50%" align="center" valign="top" style="padding-bottom: 20px;">
                                        <table width="90%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f8f9ff"
                                            style="border-radius: 8px; border-left: 4px solid #4776E6;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td
                                                                style="color: #777777; font-size: 14px; padding-bottom: 8px; font-family: Arial, sans-serif;">
                                                                <span style="color: #4776E6;"><i class="fas fa-envelope"></i></span> Email Address
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style="color: #333333; font-size: 18px; font-weight: bold; font-family: Arial, sans-serif;">
                                                                ${email}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- MESSAGE SECTION -->
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding: 10px 0 15px 0;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td
                                                    style="color: #777777; font-size: 14px; font-family: Arial, sans-serif;">
                                                    <span style="color: #4776E6;"><i class="fas fa-comment"></i></span> Message
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f8f9ff"
                                            style="border-radius: 8px; border-left: 4px solid #8E54E9;">
                                            <tr>
                                                <td
                                                    style="padding: 20px; color: #444444; font-size: 16px; line-height: 1.6; font-family: Arial, sans-serif;">
                                                    ${message}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- FOOTER SECTION -->
                    <tr>
                        <td bgcolor="#f5f7fa" style="padding: 25px 30px; border-top: 1px solid #eeeeee;">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center"
                                        style="color: #777777; font-size: 14px; line-height: 1.5; font-family: Arial, sans-serif;">
                                        This email was sent from your website's contact form. Please do not reply to
                                        this automated message.
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding-top: 15px;">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding: 0 10px;">
                                                    <a href="https://athulmj.github.io/portfolio/"
                                                        style="color: #4776E6; text-decoration: none; font-size: 13px; font-family: Arial, sans-serif;">View
                                                        in Browser</a>
                                                </td>
                                                <td style="padding: 0 10px;">
                                                    <a href="#"
                                                        style="color: #4776E6; text-decoration: none; font-size: 13px; font-family: Arial, sans-serif;">Privacy
                                                        Policy</a>
                                                </td>
                                                <td style="padding: 0 10px;">
                                                    <a href="#"
                                                        style="color: #4776E6; text-decoration: none; font-size: 13px; font-family: Arial, sans-serif;">Unsubscribe</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
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
