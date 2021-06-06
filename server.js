const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
const router = express.Router();

const users = require("./routes/api/users");
const projects = require("./routes/api/projects");
const tasks = require("./routes/api/tasks");

const app = express();
require("dotenv").config();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/", router);
app.use("/api/users", users);
app.use("/api/projects", projects);
app.use("/api/tasks", tasks);

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hemendrasharma2019@gmail.com",
    pass: process.env.Email_Pass,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});


router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = "hemendrasharma2019@gmail.com";
  const message = req.body.message;
  const mail = {
    from: name,
    to: "hemendrasharma2019@gmail.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});


  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });


const port =  5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
