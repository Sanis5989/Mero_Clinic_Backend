const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = 3001; // Ensure this port is different from your React app's port

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Handle form submission
app.post("/submit-form", (req, res) => {
  const { name, email, message, phone } = req.body;

  // Set up the transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "meroclinicbest@gmail.com",
      pass: "cjbr dymy alfi jqbb",
    },
  });

  // Set up email options
  let mailOptions = {
    from: "meroclinicbest@gmail.com",
    to: "sanishmhrzn@gmail.com",
    subject: "New Inquiry Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nPhone number: ${phone}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Form submitted successfully");
    }
  });
});

//handle appointment form confirmation
app.post("/confrim-booking", (req, res) => {
  const { email, name, date, time, doctorName, apptType } = req.body;

  // Log the email to check its value
  console.log("Email:", email);

  // Validate that the email is not empty
  if (!email) {
    return res.status(400).send("Email is required");
  }
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "meroclinicbest@gmail.com",
      pass: "cjbr dymy alfi jqbb",
    },
  });

  // Set up email options
  let mailOptions = {
    from: "meroclinicbest@gmail.com",
    to: email,
    subject: "Doctors appointment booking confirmation",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Appointment Confirmation</h2>
        <p>Dear ${name},</p>
        <p>We are pleased to confirm your appointment with the following details:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Date:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Time:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${time}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Doctor's Name:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${doctorName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Appointment Type:</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${apptType}</td>
          </tr>
        </table>
        <p>If you have any questions or need to reschedule, please contact our office at your earliest convenience.</p>
        <p>Best regards,</p>
        <p>Mero Clinic</p>
      </div>
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Form submitted successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
