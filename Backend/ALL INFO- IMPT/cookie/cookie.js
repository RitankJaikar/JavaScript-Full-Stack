// Understandoing Cookie

// What is cookie?
// HTTP cookies are small blocks of data created by a werb server while a user is browsing a website and palced on the user's computer or other devide by the user's web browser.
// Uses- Session Management, Personalization, Traking

// Cookies, localStorage, and sessionStorage are all ways to store data in the browser — but cookies are special because they’re designed specifically for client-server communication. Cookies are automatically sent to the server with every HTTP request (like visiting a page, submitting a form, etc.) — as long as they match the domain/path.

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// cookieParser is required to parse the cookie (to use req.cookies)
app.use(cookieParser("secretcode"));

// Route to send cookies
app.get("/getcookies", (req, res) => {
    // res.cookie("greet", "hello"); sent once now commented

    res.cookie("greet1", "hello1");
    res.cookie("greet2", "hello2");
    res.cookie("greet3", "hello3");

    res.send("Sent you cookie");
});
// Cookies are key-value pairs stored in the user's browser.
// Multiple cookie can be sent. Size limit is 4kb.
// Cookies are automatically sent with every client request to the server (if path/domain match). 
// Cookies persist even after refreshing the page or restarting the browser (unless configured otherwise) or even changing just route part, it will persist throughout the domain.

// Reading Cookies
app.get("/showcookies", (req, res) => {
    console.log(req.cookies); // Access all (unsigned) cookies as an object
    res.send(req.cookies);
});
// Cookies are accessed using req.cookies (requires cookie-parser middleware).

// Deleting Cookies
app.get("/deletecookie", (req, res) => {
    res.clearCookie("greet2"); // Deletes the specific cookie
    res.send("Deleted 'greet2' cookie");
});

// extra cookie settings
app.get("/setauthcookie", (req, res) => {
    res.cookie("auth", "secure_token", {
        httpOnly: true,   // Prevents JavaScript from accessing this cookie in the browser (helps protect from XSS attacks)
        secure: true,     // Ensures the cookie is only sent over HTTPS (increases security, especially on production)
        maxAge: 1000000,    // Cookie expire time (specified in milliseconds)
        signed: true      // Signs the cookie to prevent tampering (requires cookie-parser middleware with a secret)
    });
    //  sent "secretcode" with app.use(cookieParser("secretcode")); to sign

    res.send("Secure auth cookie set!");
});

app.get("/getauthcookie", (req, res) => {
    console.log(req.signedCookies); // Access all signed cookies as an object
    // if there is no tampering, it will show signed cookies as an object
    // if there is no tampering, it will show empty object {}, or {"auth":false}
    res.send(req.signedCookies);
});




app.listen(3000, () => {
    console.log("app is listning to 3000");
});