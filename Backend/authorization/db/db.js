const mongoose = require("mongoose");

//Retry Logic
const maxRetry = 5; // Maximum number of retry attempts
let attempt = 0;

const connectWithRetry = () => {
  mongoose
    .connect(
      process.env.MONGO_URI
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error(
        `MongoDB connection error (Attempt ${attempt + 1}/${maxRetry}):`,
        err
      );
      attempt++;
      if (attempt < maxRetry) {
        setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
      } else {
        console.error(
          "Max retry attempts reached. Could not connect to MongoDB."
        );
        process.exit(1); // Exit the process if all retry attempts fail
        //If all retries fail, process.exit(1); stops the Node.js process with an error status (1 indicates failure).
      }
    });
};

connectWithRetry(); // Initial call to connect



/*
//using async await
const mongoose = require("mongoose");

const maxRetry = 5; // Maximum number of retry attempts
let attempt = 0;

// Function to connect with retry logic
const connectWithRetry = async () => {
  while (attempt < maxRetry) {
    try {
      await mongoose.connect(
        process.env.MONGO_URI
      );
      console.log("Connected to MongoDB");
      return; // Exit loop on success
    } catch (err) {
      attempt++;
      console.error(
        `MongoDB connection error (Attempt ${attempt}/${maxRetry}):`,
        err
      );

      if (attempt >= maxRetry) {
        console.error("Max retry attempts reached. Could not connect to MongoDB.");
        return; //Exits the function but allows the rest of the program to continue running.
        //or
        //process.exit(1);  //Terminates the entire Node.js application immediately.
        // (if a database connection is critical for running the app, and failure should stop everything.)
        // process.exit() is specific to Node.js. It is not available in regular browser-based JavaScript.
        // alternative for browser- window.close(); // Closes the current tab (may not work in all cases)
      }

      console.log(`Retrying in 5 seconds...`);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait before retrying
    }
  }
};

// Start connection process
connectWithRetry();
*/