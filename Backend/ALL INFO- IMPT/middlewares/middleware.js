const express = require("express");
const app = express();

/*
//these will executed for any path even worng ones. These should be always in starting (before path)
app.use((req, res, next) => {
    console.log("middleware1");
    // res.send("middleware1 finisher"); // will not move furthere
    next(); //without next page will not load, it will get stuck
});

app.use((req, res, next) => {
    console.log("middleware2");
    next();
    console.log("after middleware2 next()");  //it will also execute, bad practice
});

app.use((req, res, next) => {
    console.log("middleware3");
    return next();
    console.log("after next()");  //it will not execute this time
});
*/

/*
// Creating Utility Middware:-
// e.g. Logger: Use to log/print useful info on console, e.g. time for receiving res and sending req 
app.use((req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, req.time);
    next();
});
// morgan is good logger middleware
*/

/*
// route specific
app.use("/random", (req, res, next) => {
    console.log("I am only for /random route");
    next();
});
*/

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

app.get("/random", (req, res) => {
    res.send("Hi, I am random");
});



// middleware as functions
const checkToken = (req, res, next) => {
    const {token} = req.query;
    if(token === "123") {
        return next();
    }
    res.send("ACCESS DENIED!");
};

function logAccess(req, res, next) {
    console.log("Access logged");
    next();
}

// Middleware added after the route — will still run on future requests
const afterLog = (req, res, next) => {
    console.log("Ran after /api (if next routes exist)");
    next();
}

function endLogger(req, res, next) {
    console.log("End middleware (used for logging or error handling)");
    // next();  // need to end here, otherwise will conflice with other running middleware after this, i.e. 404
}

// pass middleware as argument directly to route, multiple can be passed
app.get("/api", checkToken, logAccess, (req, res, next) => {
    res.send("private data");
    next(); // allows next middlewares to run
    // but in real ❌ Do NOT call next() here to prevent crash — response already sent
}, afterLog, endLogger);
// here checkToken & logAccess runs before req hits api
// and afterLog & endLogger runs after req hits api (just for example purpose)



// ✅ All middleware functions, including route handler, follow this format:
// (req, res, next) => { ... }
// ✅ They run in order, one after another, using `next()`
const checkToken2 = (req, res, next) => {
    console.log("checkToken");
    next(); // moves to next
};
const logAccess2 = (req, res, next) => {
    console.log("logAccess");
    next(); // moves to route handler
};
// ✅ Even route handler is just another middleware!
const sendData = (req, res) => {
    console.log("sendData");
    res.send("private data"); // ends the cycle (❌ don’t call next() here)
};
app.get("/api2", checkToken2, logAccess2, sendData);
// internally express must be using ...rest operator
// e.g. app.get(path, ...middlewareFunctions, routeHandler)
// routeHandler is also a middlewareFunction (just for highlighting purpose)



// 🔹 START Middleware (Runs before processing the request)
const startMiddleware = (req, res, next) => {
    console.log(`🚀 Request Started: ${req.method} ${req.url} at ${new Date().toISOString()}`);
    req.startTime = Date.now(); // Store request start time
    next(); // Proceed to the route handler
};

// 🔹 END Middleware (Runs after sending the response)
const endMiddleware = (req, res, next) => {
    res.on("finish", () => { // Ensures it runs after the response is sent
        const executionTime = Date.now() - req.startTime;
        console.log(`✅ Response Sent: ${req.method} ${req.url} - Execution Time: ${executionTime}ms`);
    });
    next();
};

// Apply middleware ONLY for the `/hello-world` route
app.get("/hello-world", startMiddleware, (req, res, next) => {
    res.send("HELLO WORLD");
    next(); // Ensures endMiddleware runs after response
}, endMiddleware);

/*
Output-
Request Started: GET /hello-world at 2025-03-04T12:00:00.000Z
Response Sent: GET /hello-world - Execution Time: 3ms
*/



// Error handling in express- Express comes with a built-in error handler that takes care of any errors that might be encountered in the app. This default error-handling middleware function is added at the end of the middleware function stack.

app.get("/wrong", (req, res, next) => {
    // err = err;  // express will show its own error
    // custom error
    throw new Error("wrong path");
});


// 404: in the end
app.use((req, res, next) => {
    res.status(404).send("Page not found");
});





app.listen(8080, () => {
    console.log("server is listening to port 8080")
});