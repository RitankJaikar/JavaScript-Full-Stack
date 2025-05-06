const express = require("express");
const cors = require("cors");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const passport = require("passport");
const passportAuthRoutes = require("./passport/passportAuth.js");

// call passportSetup
require("./passport/passportSetup.js");

const app = express();
const PORT = 5005;

// call db.js
require("./db/db.js");

app.use(cors());
app.use(express.json());

// Express session
app.use(
  expressSession({
    secret: "ritank",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: false,
    },
    store: connectMongo.create({
      mongoUrl:
        "mongodb+srv://ritankjaikar:Lc5QvQy8ZkiHOlay@cluster0.cpmvg.mongodb.net/authBackend",
    }),
  })
);

// Initialize Passport
app.use(passport.initialize()); // Initialize Passport middleware to handle authentication
app.use(passport.session()); // Enable session support for persistent login sessions

// Routes
app.use("/auth4", passportAuthRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
