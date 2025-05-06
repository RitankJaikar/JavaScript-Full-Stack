const express = require("express");
const app = express();
// custom errror class
const ExpressError = require("./ExpressError");

// Error handling in express- Express comes with a built-in error handler that takes care of any errors that might be encountered in the app. This default error-handling middleware function is added at the end of the middleware function stack.

// we can define our error handling middleware function as the same way we define other middleware functions

app.get("/errPath1", (req, res, next) => {
    error = error;  // express will show its own error (if not sending anything custom even in error handling middleware)

    // custom error
    // throw new Error("wrong path");
});

app.get("/errPath2", (req, res, next) => {
    throw new ExpressError(401, "Access Denied");   //will throw this custom error
});


// async errors
app.get("/errPath3", async (req, res, next) => {
    //throw new ExpressError(401, "Access Denied");   //server will crash due to async

    // correct way to handle error in async function
    next(new ExpressError(401, "Access Denied"));
});

// validation error with try/catch (better)
app.get("/errPath4", async (req, res, next) => {
    try {
        throw new ExpressError(401, "Access Denied");
    }
    catch(err) {
        console.log(err);
        next(err);
    }
});

// better way to write try/catch using asyncWrap (we can use it for all async function)
// asyncWrap ek helper function hai jo har async route handler ko try/catch se automatically wrap kar deta hai
function asyncWrap(fn) {
    return function(req, res, next) {   // this is the real handler/middleware function
        // calling fn, and if there is any error, catch will execute
        fn(req, res, next).catch(err => next(err)); // now fn becomes handler function
    }
}
app.get("/errPath4", asyncWrap(async (req, res, next) => {  // here async function is fn of asyncWrap
    throw new ExpressError(401, "Access Denied");
}));
/*
flow:-
asyncWrap(fn) gets executed/called inside app.get
hence asyncWrap(fn) has these parameters already (req, res, next) -> asyncWrap(fn)(req, res, next)
asyncWrap(fn) returns a function, hance that function has these parameters also- (req, res, next)
this will be passed to fn(req, res, next) as arguments.
*/

//these error handler can aslo handle mongoose errors


// customize error based on name
const handleReferenceError = (err) => {
    console.log("This is ReferenceError from backend");
    console.dir(err.message);
    return "This is ReferenceError from backend";
};
app.use((err, req, res, next) => {
    console.log(err.name);
    if(err.name === "ReferenceError") {
        err = handleReferenceError(err);
    }
    next(err);
});


// error handling middleware :-
app.use((err, req, res, next) => {
    // console.log(err);    //logs full err, from express
    console.log("There is an error 1");   // just logs this text, custom error

    // next(); // now it will search for non error handling middleware (which is 404) (if any)

    return next(err);   // now it will search for only error handling middleware (if any)
});

// Mdn Status- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status

app.use((err, req, res, next) => {
    console.log("There is an error 2");
    let {status = 500, message = "custom message"} = err;  // if status & message is not set, hence given default value
    res.status(status).send(message);
});


// 404: in the end
app.use((req, res, next) => {
    res.status(404).send("Page not found");
});





app.listen(8080, () => {
    console.log("server is listening to port 8080")
});