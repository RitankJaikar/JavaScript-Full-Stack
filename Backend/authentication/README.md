- npm i express cors express-session connect-mongo passport jsonwebtoken passport-google-oauth20 uuid


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




## JWT (JSON Web Token) based Authorization
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




## Session Based Auth
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

Session-based authentication is a method of maintaining user authentication by storing user data in a session on the server. Here’s how it works step by step:
- User logs in → Credentials are verified, session is created (req.session.userId).
- Session is stored on the server & linked to the user.
- Subsequent requests check if a valid session exists.
- User logs out → Session is destroyed.





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