const mongoose = require("mongoose");

const maxRetry = 5; // Maximum number of retry attempts
let attempt = 0;

const connectWithRetry = () => {
  mongoose
    .connect(
      "mongodb+srv://ritankjaikar:Lc5QvQy8ZkiHOlay@cluster0.cpmvg.mongodb.net/authorization"
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
      }
    });
};

connectWithRetry(); // Initial call to connect
