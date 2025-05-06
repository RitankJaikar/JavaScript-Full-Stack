
# Express Middleware Notes

## 🧠 What is Middleware?

In **Express.js**, middleware functions are functions that execute **after** the server receives the request and **before** the response is sent to the client.

### 🛣️ Flow:
```
Request → Middleware(s) → Response
```

---

## 🛠️ What Can Middleware Do?

- Execute any kind of logic/code (e.g., logging, authentication)
- Access and modify:
  - `req` (request object)
  - `res` (response object)
- End the request-response cycle by sending a response
- Call the next middleware in the stack using `next()`

---

## 🔗 Middleware Chaining

Multiple middleware functions can be chained together. You can move to the next middleware using:

```js
next();
```

Or break the chain by sending a response:

```js
res.send("Ending here");
```

---

## 🧰 Common Middleware Examples

```js
const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const path = require("path");

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Allows using methods like PUT or DELETE via POST (query: ?_method=PUT)
app.use(methodOverride('_method'));

// Parse URL-encoded data (e.g., from forms)
app.use(express.urlencoded({ extended: true }));

// Serve static files like CSS from /public/css
app.use(express.static(path.join(__dirname, "/public/css")));
```

---

## 🧩 Types of Middleware

- **Application-level middleware** – e.g., `app.use(...)`
- **Router-level middleware** – applied only to specific routes
- **Error-handling middleware** – has 4 arguments `(err, req, res, next)`
- **Built-in middleware** – like `express.json()` and `express.static()`
- **Third-party middleware** – like `cors`, `body-parser`, `cookie-parser` etc.

---

## ✅ Example Use Case

```js
// Custom middleware logger
app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next(); // Pass to next middleware/route handler
});
```

---

## 📌 Summary

Middleware functions:
- 🔄 Intercept requests before they hit route handlers
- 🔧 Modify `req`/`res`
- ⛓️ Chain to other middleware with `next()`
- 🚫 Or break the chain by sending a response
