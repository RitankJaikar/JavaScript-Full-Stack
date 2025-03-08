authorization/
│── db/
│   ├── db.js                  # MongoDB connection setup
│
│── middleware/
│   ├── checkAuthorization.js   # Middleware to verify user roles
│   ├── checkLoginSession.js    # Middleware to check if a session exists
│
│── models/
│   ├── User.js                 # Mongoose model for user schema
│
│── routes/
│   ├── user.js                 # Routes for authentication (login, register, logout, protected route)
│
│── utils/
│   ├── customResponse.js        # Custom response handler
│
│── app.js                      # Main entry point, initializes Express app
│── package.json                 # Dependencies and scripts
│── README.md                    # Project documentation


- npm i bcrypt connect-mongo cors express express-session mongoose


1. User Model (models/User.js)
- Defines User schema with fields like name, email, password, and userType (for role-based access control).

2. Middleware for Authorization
🔹 checkLoginSession.js
- Ensures a user is logged in before accessing protected routes.
- Checks if req.session.userId exists (for session-based authentication).
🔹 checkAuthorization.js
- Role-based access control (RBAC).
- Reads the user ID from headers (req.headers.id).
- Fetches user from MongoDB and verifies if their role matches the required roles.

3. Routes (routes/user.js)
- POST /register → Creates a new user (hashes password using bcrypt).
- POST /login → Authenticates user (validates credentials using bcrypt.compare), stores session.
- GET /route1 → Protected route, requires checkAuthorization(["user"]).
- GET /admin-route → Protected route, requires checkAuthorization(["admin"]).
- GET /multi-role-route → Protected route, requires checkAuthorization(["admin", "sub-admin"]).
- POST /logout → Destroys session and clears session cookie.

4. Express Server (app.js)
- Sets up Express, CORS, Session Handling.
- Imports middleware and routes.
- Starts the server (nodemon app.js for live reloading).

5. Full Authorization Flow
1️⃣ User registers (/register) → Password is hashed, stored in MongoDB.
2️⃣ User logs in (/login) → Password is verified, session is created.
3️⃣ User accesses protected route (/route1) →
✅ If session exists, checkAuthorization() verifies role-based access.
❌ If session is missing, access is denied.
4️⃣ User logs out (/logout) → Session is destroyed.

✨ Summary
- Session-based authentication using express-session and connect-mongo.
- Role-based authorization using checkAuthorization.js.
- Secure password handling with bcrypt.
- Custom response structure (customResponse.js) for consistent API responses.