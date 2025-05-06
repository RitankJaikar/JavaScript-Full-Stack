const express = require("express");
const cors = require("cors");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");

const app = express();
const PORT = 5005;

// call db.js
require("./db/db.js");

// models
const User = require("./models/User.js");
const RefreshToken = require("./models/RefreshToken.js");

// route(s) & middleware(s)
const authTokenUser = require('./tokenBasedAuth/userToken.js');
const jwtTokenUser = require('./tokenBasedAuth/jwtToken.js');
const sessionBasedAuth = require('./sessionBasedAuth/userSession.js');

app.use(cors());
app.use(express.json());

app.use(    // this will execute before all route
    expressSession({
        secret: process.env.SESSION_SECRET,   // Used to sign the session ID cookie for security
        saveUninitialized: false,   // Prevents saving empty sessions
        resave: false,  //Prevents unnecessary session updates, improves performance
        cookie: {   // Session cookie settings e.g. expiration, security, and access restrictions
            //default name: "connect.sid"
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // Session lasts for 7 days 
            maxAge: 1000*60*60*24*7,    // Redundant but fine if you want both
            httpOnly: true, // Prevents client-side JavaScript access to the cookie (security measure)
            secure: false   // Set to `true` in production to ensure cookies are sent only over HTTPS
        },
        store: connectMongo.create({    // Session store: Saves session data in MongoDB instead of memory (better scalability)
            mongoUrl: process.env.MONGO_URI, //should be in env
            // collectionName: "sessions"  //default
        }),
        rolling: true, // refresh cookie on each request
        // every time the user makes a request to the server (even just loading a new page or refreshing), the session cookie’s expiry is refreshed. Ideal for if user is logging in everyday, so expiry will extend every time, and user won't loged out after 7 days.
        // good for SPAs(Single Page Application) like React, won’t refresh the cookie unless a backend call is made.
    })
);
// Internally, Express sessions use these event listeners:
// Triggered when the response is fully sent
// res.on("finish", () => {
//     console.log("Req Finished")
// })
// Triggered when the connection is closed
// res.on("close", () => {
//     console.log("Req Closed")
// })


// Route(s)

// Token based authentication
app.use("/auth1", authTokenUser);

//JWT based authentication
app.use("/auth2", jwtTokenUser);

//Session based authentication
app.use("/auth3", sessionBasedAuth);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});