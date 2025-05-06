# Express Error Handling – Reusable Pattern

This README explains how to implement clean, reusable error handling in Express apps, including custom error classes, handling async errors, and writing error middleware.

## 📚 Table of Contents
- [📦 Setup](#📦-setup)
- [🧱 Custom Error Class](#🧱-custom-error-class)
- [❗ Basic Error Handling](#❗-basic-error-handling)
- [⚡ Handling Async Errors](#⚡-handling-async-errors)
- [🚀 asyncWrap Helper Function](#🚀-asyncwrap-helper-function)
- [🧠 Error Type-Based Custom Handlers](#🧠-error-type-based-custom-handlers)
- [🚨 Global Error Middleware](#🚨-global-error-middleware)
- [🛑 404 Not Found Handler](#🛑-404-not-found-handler)
- [📘 MDN Status Reference](#📘-mdn-status-reference)

---

Error handling in express-  

By default, Express comes with a built-in error handler that takes care of any errors that might be encountered in the app. This default error-handling middleware function is added at the end of the middleware function stack. 

But we can define our error handling middleware functions as the same way we define other middleware functions.

So if you pass any error to next(err), Express will skip all non-error middleware and look for the nearest error handler defined as (err, req, res, next).

---

## 📦 Setup
```js
const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");
```

## 🧱 Custom Error Class
A custom error class can be used to throw and format specific errors.

```js
class ExpressError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}
module.exports = ExpressError;
```

## ❗ Basic Error Handling
```js
app.get("/errPath1", (req, res, next) => {
    error = error;  // triggers default Express error
});
```

```js
app.get("/errPath2", (req, res, next) => {
    throw new ExpressError(401, "Access Denied");  // custom error
});
```

## ⚡ Handling Async Errors
Without wrapping, throwing an error in async will crash the server:
```js
app.get("/errPath3", async (req, res, next) => {
    next(new ExpressError(401, "Access Denied"));
});
```

### ✅ Recommended: try/catch block
```js
app.get("/errPath4", async (req, res, next) => {
    try {
        throw new ExpressError(401, "Access Denied");
    } catch (err) {
        next(err);
    }
});
```

## 🚀 asyncWrap Helper Function
Avoid repeated try/catch blocks by using a helper function:
```js
function asyncWrap(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(err => next(err));
    }
}

app.get("/errPath4", asyncWrap(async (req, res, next) => {
    throw new ExpressError(401, "Access Denied");
}));
```

### 🧭 Flow:
- `asyncWrap(fn)` returns a middleware with `(req, res, next)`
- Express calls this middleware and passes `req, res, next`
- Inside, `fn(req, res, next)` is called and `.catch()` handles errors

## 🧠 Error Type-Based Custom Handlers
```js
const handleReferenceError = (err) => {
    console.log("This is ReferenceError from backend");
    return "This is ReferenceError from backend";
};

app.use((err, req, res, next) => {
    if (err.name === "ReferenceError") {
        err = handleReferenceError(err);
    }
    next(err);
});
```

## 🚨 Global Error Middleware
```js
app.use((err, req, res, next) => {
    console.log("There is an error 1");
    return next(err);
});

app.use((err, req, res, next) => {
    console.log("There is an error 2");
    let { status = 500, message = "custom message" } = err;
    res.status(status).send(message);
});
```

## 🛑 404 Not Found Handler
```js
app.use((req, res, next) => {
    res.status(404).send("Page not found");
});
```

## 📘 [MDN Status Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)

---

## ▶ Start Server
```js
app.listen(8080, () => {
    console.log("server is listening to port 8080");
});
```