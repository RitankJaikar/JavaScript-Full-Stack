const express = require("express");
const cors = require("cors");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const userRouter = require("./routes/user.js")

const app = express();
const PORT = 5005;

// call db.js
require("./db/db.js");

// route(s) & middleware(s)
app.use(cors());
app.use(express.json());

app.use(
    expressSession({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000*60*60*24*7,
            httpOnly: true,
            secure: false
        },
        store: connectMongo.create({
            mongoUrl: process.env.MONGO_URI,
        })
    })
);

// route(s)
app.use("/authorization", userRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});