- npm i express cors express-session connect-mongo passport jsonwebtoken passport-google-oauth20 uuid


Authentication- is the process of verifying who someone is.

Authorization- is the process of verifying what specific applications, files, data, etc. has the user access to.

How are passwords stored?
We never store the password as it is. We store thir hashed form.

What is Hashing Function?
For every input, there is a fixed output.
They are one-way functions, we can't get input from output.
For a different input, there is a different output but of same length.
Small changes in input should bring large changes in output.
e.g. SHA256, MD5, CRC, bcrypt

What is Salting?
Password salting is a technique to protect passwords stored in databases by adding a string of 32 or more characters and then hashing them.


## Token based Authentication
/project-root
│── app.js                     # Main entry file, initializes server and routes
│── /db
│   ├── db.js                   # Database connection setup
│── /models
│   ├── User.js                 # Mongoose schema for User model
│── /routes
│   ├── userToken.js            # Routes for authentication (register, login, secret routes)
│── /middleware
│   ├── checkLogin.js           # Middleware for authentication (verifies token)
│── /utils
│   ├── customResponse.js       # Utility for custom API responses


app.js-
- Initializing Express app
- Connecting to DB
- Applying middleware (CORS, JSON parsing)
- Mounting authentication routes

routes/userToken.js (Authentication Route, normal token based authorization)
- Registering users
- Logging in (generating tokens)
- Securing routes (with and without middleware)
**Problems-
- Storing tokens in the database is inefficient and insecure because it allows attackers to hijack user sessions if they gain access to the database.
- Tokens should have an expiration time, but here, the token remains valid indefinitely.
- If a user logs out, the token remains in the database without a proper invalidation mechanism. 
- New login → New token .logging in from a new device will generate a new token, overwriting the previous one. Old token becomes invalid (Previous device logs out automatically)

models/User.js (Mongoose Schema)
- Defining user model
- Storing hashed password and authentication token

middleware/checkLogin.js (Auth Middleware)
- Checking if a user is authenticated before accessing protected routes

utils/customResponse.js (Custom Response Utility)
- Standardizing API responses




## JWT (JSON Web Token) based Authentication
- npm i jsonwebtoken

/project-root
│── app.js
│── /db
│   ├── db.js
│── /models
│   ├── User.js
│   ├── RefreshToken.js
│── /routes
│   ├── jwtToken.js
│── /middleware
│   ├── checkLoginJwt.js
│── /utils
│   ├── customResponse.js

🔑 Why Do We Use Two Tokens?
We use Access Token and Refresh Token for secure authentication.

Access Token – This is short-lived (e.g., 1 minute) and used for quick authentication. Every time the user makes a request (like fetching user data), this token is sent to verify identity.

Refresh Token – This is long-lived (e.g., 30 days) and used to get a new access token when the old one expires. It is stored securely in the database.

🚀 Login Flow
- User Logs In – The user enters their email and password.
- Credentials Are Verified – The server checks if the email exists and if the password is correct.
- JWT Tokens Are Generated
- An Access Token (valid for 1 minute) is created for quick authentication.
- A Refresh Token (valid for 30 days) is created and stored in the database.
- Tokens Are Sent to the User – The user receives both tokens in response.

🔄 Using Tokens After Login
- Making API Requests
    The user sends the Access Token with each request (e.g., fetching profile data).
    The server verifies the token and responds with the requested data.
- Access Token Expires
    Since access tokens expire quickly, after 1 minute, the user’s request fails due to an "expired token."
- Using Refresh Token
    Instead of asking the user to log in again, the client sends the Refresh Token to the server.
    The server checks if the refresh token is valid and not expired.
    If valid, a new Access Token is generated and sent back to the user.
- Refresh Token Expiry or Logout
    If the refresh token is expired (or user logs out), the user must log in again.
    The refresh token is removed from the database during logout.

🔒 Security Benefits
- The Access Token is short-lived, so if stolen, it becomes useless quickly.
- The Refresh Token is securely stored in the database, preventing unauthorized access.
- This setup keeps authentication fast, secure, and efficient! 🚀

✅ **Middleware: `checkLoginJwt.js` (Auth Verification)**
- This middleware is responsible for verifying the **Access Token** in incoming requests.
- It extracts the token from the `Authorization` header, verifies it using `jwt.verify()`, and checks if the user exists.
- If valid, it attaches the user data to the request object and allows access to protected routes.
- If invalid or expired, it responds with an unauthorized error.

✅ **Updating the Access Token (`/updateAuthToken` route)**
- If the Access Token expires, the client can send the **Refresh Token** to this route.
- The server checks if the refresh token is valid and retrieves the user.
- A **new Access Token** is generated and returned.
- This prevents the need for the user to log in again.

✅ **Logout (`/logout` route)**
- The user can log out by sending the refresh token to this endpoint.
- The server removes the refresh token from the database, ensuring it can't be used again.
- This enhances security by preventing token reuse after logout.




## Session Based Authentication
npm i express-session connect-mongo

/project-root
│── app.js
│── /db
│   ├── db.js
│── /models
│   ├── User.js
│── /routes
│   ├── userSession.js
│── /middleware
│   ├── checkLoginSession.js
│── /utils
│   ├── customResponse.js

Session-based authentication is a method of maintaining user authentication by storing user data in a session on the server. Here’s how Session-Based Authentication Works (with express-session) works step by step:
- User Logs In
    → Credentials are validated (email/password).
    → A session is created:
    ```js 
    req.session.userid = user._id;
    ```
- Session Stored on Server
    → Session is saved in memory or a store (e.g., MongoDB via connect-mongo).
    → Server sends a cookie (connect.sid) to the browser containing a unique session ID.
- Browser Stores the Cookie
    → Cookie is automatically stored and sent with every request to the server.
- On Every Next Request(s)
    → Server receives the session ID from the cookie.
    ```js
    const userid = req.session.userid;
    ```
    → Server checks the session store:
    “Session ID abc123 maps to user _id: 123 → Access granted.”
- User Logs Out
    → Session is destroyed on the server:
    ```js
    req.session.destroy();
    ```

Advantages:
- No need to send token/user ID manually.
- Most of the things are auto b/w server and client using express-session.
- Session data is hidden from client (secure).
- Easy to invalidate (just destroy session).

What is session?
A session is a temporary, stateful connection between the client and server that persists across multiple requests to maintain user-specific data like authentication.
🔓 Login → 🚶‍♂️ Walk around the site → 🔒 Logout = one session

What is cookie?
HTTP cookies are small blocks of data created by a web server while a user is browsing a website and palced on the user's computer or other devide by the user's web browser.
Uses- Session Management, Personalization, Traking

What is Protocol?
A protocol defines the rules and format for how requests and responses travel between the client and the server. HTTP/HTTPS is the most common protocol for web.

What is State and Status?
- Status refers to the outcome of a request or operation. It usually comes in the form of a status code (like 200 OK, 404 Not Found, 500 Server Error) to tell whether the request was successful, failed, or something else happened.
- State refers to the current condition or data of the application, server, or user at a point in time.
A user is logged in → That's a state.
A shopping cart has 3 items → That's a state.
Dark mode is enabled → Also a state.

What is Stateful Protocol and Stateless Protocol?
- Stateful Protocol require server to save status and server information. e.g. ftp (File Transfer Protocol)
- Stateless Protocol does not require the server to retain the server information. e.g. http (Hypertext Transfer Protocol)
e.g.
Cash payment can be Stateless Protocol. (no reference for future who gave it)
UPI payment can be Stateful Protocol. (there is reference for future who gave it)

So, although HTTP is Stateless, but using cookie and express-session we will make an attempt to make session Stateful.





# 🔐 Comparison of Authentication Methods in Node.js

| Feature/Aspect              | Token-Based Authentication           | JWT-Based Authentication                            | Session-Based Authentication                            |
|----------------------------|--------------------------------------|-----------------------------------------------------|----------------------------------------------------------|
| **Tech Stack**             | Token in DB                          | JWT (Access + Refresh)                              | express-session + connect-mongo                          |
| **Main Dependency**        | jsonwebtoken (optional)              | jsonwebtoken                                        | express-session, connect-mongo                           |
| **Where Token is Stored**  | In Database                          | Access → Client<br>Refresh → DB                     | On Server (Session) + Client Cookie                      |
| **Auth Verification**      | Custom middleware                    | JWT Middleware                                      | Session Middleware                                       |
| **Token Lifespan**         | Until logout or overwrite            | Access: Short<br>Refresh: Long                      | Until session expiry or logout                           |
| **Logout**                 | Manual token removal                 | Refresh token deleted                               | Session destroyed                                        |
| **Secure Against Token Theft?** | ❌ No expiry/invalidation       | ✅ Short-lived + Refresh                            | ✅ Session timeout/invalidation                          |
| **Client-Side Cookie Used?** | No                                 | Optional (mostly not)                               | ✅ Yes                                                   |
| **Scalability**            | Moderate                             | ✅ Highly Scalable                                  | ❌ Needs sticky sessions or DB store                     |
| **Stateless/Stateful**     | Stateless but stores in DB           | Stateless (JWT) + DB                                | Stateful                                                 |
| **Best Use Case**          | Basic apps, no refresh needed        | APIs, SPAs, Mobile Apps                             | Traditional web apps                                     |





## Passport 
npm i passport passport-google-oauth20

/project-root
│── app.js
│── /db
│   ├── db.js
│── /models
│   ├── PassportUser.js
│── /passport
│   ├── passportAuthRoute.js
│   ├── passportSetup.js
│── /middleware
│   ├── checkLoginPassport.js
│── /utils
│   ├── customResponse.js

-> Full Flow of Google OAuth Authentication Using Passport.js
1. Setup & Config
- Install dependencies (passport, passport-google-oauth20, express-session, mongoose).
- Get GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET from Google Cloud.

2. Database (MongoDB + Mongoose)
- Create a User model to store googleId, name, email, etc.

3. Express App (app.js)
- Set up server, connect to DB, configure express-session.
- Initialize Passport.js for authentication.

4. Passport Setup (passportSetup.js)
- Use passport-google-oauth20 strategy.
- Find/Create user in DB, store session.
- Serialize & deserialize user for session management.

5. Auth Routes (passportAuth.js)
- /auth/google: Start Google login.
- /auth/google/callback: Handle login response.
- /logout: Destroy session & logout.

6. Protected Routes & Middleware
Middleware (checkPassport) restricts access to authenticated users.

Flow Summary
- User clicks Login with Google → Redirects to Google.
- Google authenticates → Redirects back → Session stored.
- User accesses protected routes.
- Logout clears session.