const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs").promises;
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();
const upload = multer();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());

const EMAIL_USERNAME = "borisburdeyniy@gmail.com";
const EMAIL_PASSWORD = "dzsordxtrskbdwnh";
const SEND_EMAIL = "webkpi21@gmail.com";
const BOT_TOKEN = "1858844290:AAG4xVcUFcD6nNnKqz1biKvcGrhwNCsOHMk";
const CHAT_ID = "-4640229019";

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "views/index.html"))
);
app.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "views/login.html"))
);
app.get("/register", (req, res) =>
  res.sendFile(path.join(__dirname, "views/register.html"))
);
app.get("/feedback", (req, res) =>
  res.sendFile(path.join(__dirname, "views/feedback.html"))
);

async function saveToFile(filename, data) {
  try {
    await fs.appendFile(filename, data + "\n", "utf8");
  } catch (err) {
    console.error("Error saving to file:", err);
  }
}

async function sendEmail(subject, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"NodeJS App" <${EMAIL_USERNAME}>`,
      to: SEND_EMAIL,
      subject,
      text,
    });
    console.log("Email sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

async function sendToTelegram(message) {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await axios.post(url, {
      chat_id: CHAT_ID,
      text: message,
    });
    console.log("Message sent to Telegram");
  } catch (err) {
    console.error("Error sending to Telegram:", err);
  }
}

app.post("/register", async (req, res) => {
  const {
    username,
    password,
    firstname,
    lastname,
    email,
    years,
    phone,
    country,
    sex,
    agree,
  } = req.body;

  if (
    username &&
    password &&
    firstname &&
    lastname &&
    email &&
    years &&
    phone &&
    country &&
    sex &&
    agree
  ) {
    const data = `Register:
Username: ${username}
Password: ${password}
First Name: ${firstname}
Last Name: ${lastname}
Email: ${email}
Years: ${years}
Phone: ${phone}
Country: ${country}
Sex: ${sex}
Agreement: ${agree}`;

    await saveToFile("register.txt", data);
    await sendEmail("New Registration", data);
    await sendToTelegram(
      `New Registration:\n${data}\n\nПІБ: Бурдейний Б. В.\nГрупа: ТР-31\nЛР6-2024`
    );

    res.redirect("/login");
  } else {
    res.send("Please provide all required information.");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const data = `Login:
Username: ${username}
Password: ${password}`;

    await saveToFile("login.txt", data);
    await sendEmail("New Login", data);
    await sendToTelegram(
      `New Login:\n${data}\n\nПІБ: Бурдейний Б. В.\nГрупа: ТР-31\nЛР6-2024`
    );

    res.redirect("/");
  } else {
    res.send("Please provide both username and password.");
  }
});

app.post("/feedback", async (req, res) => {
  const feedback = req.body.feedback;

  if (feedback) {
    const data = `Feedback:
${feedback}`;

    await saveToFile("feedback.txt", data);
    await sendEmail("New Feedback", data);
    await sendToTelegram(
      `New Feedback:\n${data}\n\nПІБ: ПІБ: Бурдейний Б. В.\nГрупа: ТР-31\nЛР6-2024`
    );

    res.send("Thank you for your feedback!");
  } else {
    res.send("No feedback submitted.");
  }
});

app.listen(8081, () => console.log("Server running on http://localhost:8081"));
