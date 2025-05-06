# Mongoose with Node.js and Express

## 📚 Table of Contents

- [Mongoose with Node.js and Express](#mongoose-with-nodejs-and-express)
  - [Overview](#overview)
    - [What is an ORM/ODM?](#what-is-an-ormodm)
  - [Key Concepts](#key-concepts)
  - [Project Structure](#project-structure)
  - [Installation](#installation)
  - [Setting Up Mongoose Schema, Model and Relationships](#setting-up-mongoose-schema-model-and-relationships)
  - [Creating Routes for Stories (CRUD Operations)](#creating-routes-for-stories-crud-operations)
  - [Connecting to MongoDB and Running Express Server](#connecting-to-mongodb-and-running-express-server)
  - [Local vs. Remote MongoDB Connection](#local-vs-remote-mongodb-connection)
  - [Mongoose Connection Retry Logic (JS)](#mongoose-connection-retry-logic-js)

## Overview
Mongoose is an **Object Data Modeling (ODM)** library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model application data.

### What is an ORM/ODM?
**ORM (Object Relational Mapper)** is software that bridges the gap between relational databases and object-oriented programming. Since MongoDB is a NoSQL database, Mongoose is referred to as an **ODM (Object Document Mapper)**.

## Key Concepts
- **Schema**: Defines the structure of the document stored in a MongoDB collection.
- **Model**: A compiled schema that allows querying and modifying documents in a collection.

---
This guide covers setting up Mongoose with Node.js and Express to build a CRUD API for managing stories with categories and tags. It explains key Mongoose concepts like Schemas and Models, provides a structured project setup, and includes step-by-step implementation for defining models, creating routes, and connecting to MongoDB (both locally and via MongoDB Atlas). The API supports story creation, retrieval, updating, and deletion, ensuring categories and tags are properly managed. Additionally, environment variables are used for secure database connections. 🚀

## Project Structure
```
project-directory/
│-- models/
│   ├── Story.js
│-- routes/
│   ├── storyRoutes.js
│-- server.js
│-- package.json
│-- README.md
```

---

## Installation
Before running the project, ensure you have **Node.js** and **MongoDB** installed.

Install required dependencies:
```sh
npm init -y  # Initialize Node.js project (if not already done)
npm install express mongoose dotenv
```

---

## Setting Up Mongoose Schema, Model and Relationships
// models/Category.js
```js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
```

// models/Tag.js
```js
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
```

// models/Author.js
```js
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bio: String
    // You could also reference the story here to make it bidirectional
    // story: { type: mongoose.Schema.Types.ObjectId, ref: "Story", unique: true }
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
```

// models/User.js (for likes)
```js
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: String
    // Other fields as needed
});

const User = mongoose.model("User", userSchema);
module.exports = User;
```

// /models/Comment.js   (One-to-Squillions)
```js
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",          // referencing the parent Story
        required: true,
        index: true            // good for performance when querying by story
    },
    author: {
        type: String
    }
}, {
    timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
// One-to-Squillions: A single Story could have thousands or millions of comments. (Reference in child)
// Embedding them all inside Story would make the document huge (bad for performance, especially due to MongoDB’s 16MB document size limit).
// Referencing from the child (Comment) allows independent scaling and pagination
```

// models/Story.js
```js
const mongoose = require("mongoose");

// Define the schema for the story collection
const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"]
    },
    subtitle: {
        type: String
    },
    story: {
        type: String,
        maxLength: 50
    },
    author: {           // One to One: Each story has one author
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        unique: true,   // Ensures one story has one unique author (and vice versa)
        required: true
    },
    characters: [{      // One to few relation (embedded subdocuments)
        name: String,
        role: String,
        age: Number,
        _id: false      // now mongoDB will not set _id
    }],
    category: {         // one to many relation (referencing)
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    tags: [{            // one to many relation (referencing)
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }],
    likes: [{           // One to Squillions: Massive number of likes (array of user IDs)
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
},
    { timestamps: true } //(inbuilt) will include createdAt and updatedAt automatically
);

/*
All relations:-
🧍‍♂️ One-to-One:          Story → Author
👨‍👩‍👧 One-to-Few:          Story → Characters          (Embedded Subdocuments)
📚 One-to-Many:         Story → Category & Tags     (Referencing)
💬 One-to-Squillions    Comment → Story             (Reference in Child)
❤️ One-to-Squillions    Story → Likes (Users)       (Reference in Parent)
// some might not make that much sense like Story → Author & Story → Likes.
// These are just for example purpose
*/

// https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design
/*
Denormalization: matlab — same data ko baar-baar copy karna jahan zarurat ho, taaki read fast ho jaye aur populate() use na karna pade.
Use karo jab:
- Read zyada hai, write kam.
- Data rarely update hota hai.
Avoid karo jab:
- Field bar-bar update hoti ho → sab jagon pe update karna padega = extra mehnat.
*/

/*
 * 🔹 PRE-HOOK (Before Saving to Database)
 * - This middleware runs **before** saving (`.save()`) a new or updated story.
 * - Used for validation, data manipulation, logging, etc.
*/
storySchema.pre("save", function (next) {
    console.log(`📌 Preparing to save story: ${this.title}`);
    
    // Automatically trim the story content to max length
    if (this.story.length > 50) {
        this.story = this.story.substring(0, 50);
    }

    next(); // Move to the next middleware or save operation
});

/*
 * 🔹 POST-HOOK (After Saving to Database)
 * - This middleware runs **after** the story has been saved.
 * - Used for logging, triggering events, sending notifications, etc.
*/
storySchema.post("save", function (doc, next) {
    console.log(`✅ Story "${doc.title}" has been successfully saved!`);
    next();
});

/*
 * 🔹 PRE-HOOK (Before Deleting a Story)
 * - Runs before a document is deleted.
 * - Used for cleanup operations like removing references from related documents.
*/
storySchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    console.log(`🗑️ Story "${this.title}" is being deleted.`);
    // Example: Remove references in other collections if needed
    next();
});

/*
 * 🔹 POST-HOOK (After Deleting a Story)
 * - Runs after a document is deleted.
 * - Used for sending notifications, logging, or cleaning up related data.
*/
storySchema.post("deleteOne", { document: true, query: false }, function (doc, next) {
    console.log(`⚠️ Story "${doc.title}" has been deleted.`);
    next();
});

// Create the model from the schema
const Story = mongoose.model("Story", storySchema);

module.exports = Story;
```

---

## Creating Routes for Stories (CRUD Operations)
Create a `routes/storyRoutes.js` file:
```js
const express = require("express");
const Story = require("../models/Story");
const Category = require("../models/Category");
const Tag = require("../models/Tag");

const router = express.Router();

// Create a new story with category and tags
// POST http://localhost:8080/api/stories
router.post("/stories", async (req, res) => {
    try {
        const { title, subtitle, story, category, tags } = req.body;

        // Ensure category exists or create a new one
        let categoryDoc = await Category.findOne({ name: category });
        if (!categoryDoc) {
            categoryDoc = new Category({ name: category });
            await categoryDoc.save();
        }

        // Ensure all tags exist or create them
        const tagDocs = await Promise.all(tags.map(async (tag) => {
            let tagDoc = await Tag.findOne({ name: tag });
            if (!tagDoc) {
                tagDoc = new Tag({ name: tag });
                await tagDoc.save();
            }
            return tagDoc._id;
        }));

        const newStory = new Story({ title, subtitle, story, category: categoryDoc._id, tags: tagDocs });
        await newStory.save();
        res.status(201).json(newStory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all stories
// GET http://localhost:8080/api/stories
router.get("/stories", async (req, res) => {
    try {
        const stories = await Story.find().populate("category").populate("tags");
        //Used .populate() to fetch complete category and tag details (not just id, full data) in GET routes.
        res.json(stories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single story by ID
// GET http://localhost:8080/api/stories/:id
router.get("/stories/:id", async (req, res) => {
    try {
        const story = await Story.findById(req.params.id).populate("category").populate("tags");
        if (!story) {
            return res.status(404).json({ message: "Story not found" });
        }
        res.json(story);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a story by ID
// PUT http://localhost:8080/api/stories/:id
router.put("/stories/:id", async (req, res) => {
    try {
        const { title, subtitle, story, category, tags } = req.body;
        let categoryDoc = await Category.findOne({ name: category });
        if (!categoryDoc) {
            categoryDoc = new Category({ name: category });
            await categoryDoc.save();
        }
        const tagDocs = await Promise.all(tags.map(async (tag) => {
            let tagDoc = await Tag.findOne({ name: tag });
            if (!tagDoc) {
                tagDoc = new Tag({ name: tag });
                await tagDoc.save();
            }
            return tagDoc._id;
        }));
        
        const updatedStory = await Story.findByIdAndUpdate(req.params.id, { title, subtitle, story, category: categoryDoc._id, tags: tagDocs }, { new: true });
        if (!updatedStory) {
            return res.status(404).json({ message: "Story not found" });
        }
        res.json(updatedStory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a story by ID
// DELETE http://localhost:8080/api/stories/:id
router.delete("/stories/:id", async (req, res) => {
    try {
        const deletedStory = await Story.findByIdAndDelete(req.params.id);
        if (!deletedStory) {
            return res.status(404).json({ message: "Story not found" });
        }
        res.json({ message: "Story deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
```

---

## Connecting to MongoDB and Running Express Server
Create a `server.js` file:
```js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const storyRoutes = require("./routes/storyRoutes");

const app = express();

// Middleware
app.use(express.json());

// Use story routes
app.use("/api", storyRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("Error: ", err));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

---

## Local vs. Remote MongoDB Connection

For **local development (MongoDB Compass)**, use:

```js
mongoose.connect("mongodb://127.0.0.1:27017/your-database");
```

- `127.0.0.1` (or `localhost`) refers to your local machine.
- `27017` is the default MongoDB port.
- `your-database` is your database name.

For **remote deployment (MongoDB Atlas)**, use:

```js
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net/your-database");
```

- Replace `<username>` and `<password>` with your actual credentials.
- Whitelist your IP in **MongoDB Atlas** for remote access.
- Store credentials securely using `.env`.

---

## Setting Up Environment Variables
To keep your database credentials secure, use a `.env` file:
```sh
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database
PORT=8080
```

Load the environment variables in `server.js` using:
```js
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI);
```

---

## Running the Project
```sh
node server.js
```
Server should start and connect to MongoDB.

---

## Conclusion
This setup allows you to build a complete **CRUD API** using **Express**, **Mongoose**, and **MongoDB**. You can extend it with authentication, middleware, and frontend integration as needed.

## Mongoose Connection Retry Logic (JS)

```js
const mongoose = require("mongoose");

//Retry Logic-1
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
        process.exit(1); // Exit the process if all retry attempts fail
        //If all retries fail, process.exit(1); stops the Node.js process with an error status (1 indicates failure).
      }
    });
};

connectWithRetry(); // Initial call to connect


//Retry Logic-2 (using async await)
const mongoose = require("mongoose");

const maxRetry = 5; // Maximum number of retry attempts
let attempt = 0;

// Function to connect with retry logic
const connectWithRetry = async () => {
  while (attempt < maxRetry) {
    try {
      await mongoose.connect(
        "mongodb+srv://ritankjaikar:Lc5QvQy8ZkiHOlay@cluster0.cpmvg.mongodb.net/authorization"
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
```