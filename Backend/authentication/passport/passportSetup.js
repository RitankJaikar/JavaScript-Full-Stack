const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID, // Google OAuth client ID from environment variables
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || GOOGLE_CLIENT_SECRET, // Google OAuth client secret from environment variables
      callbackURL: "/auth/google/callback", // Callback URL where Google redirects after authentication
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if a user with the given Google ID already exists in the database
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Create a new user if not found in the database
          user = await User.create({
            googleId: profile.id, // Store Google ID
            name: profile.displayName,
            email: profile.emails[0].value,
          });
        }

        return done(null, user); // Pass the user object to Passport for session handling (here null means no error)
      } catch (err) {
        return done(err, null, { message: "Something went wrong" });
      }
    }
  )
);

// Serialize user to store only the user ID in the session
// This reduces the session size by not storing the entire user object
passport.serializeUser((user, done) => {
  done(null, user.id); // Stores only the user ID in the session
});

// Deserialize user to retrieve full user details from session
// When a request is made, this function fetches the user from the database using the stored ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Retrieve user details from the database
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
