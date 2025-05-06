# Mongoose Quick Guide

This **Mongoose Quick Guide** provides a concise overview of using Mongoose with MongoDB in **Node.js**. It covers:

- **Installation**: (`npm install mongoose`)  
- **Connecting to MongoDB**: Using `mongoose.connect()`  
- **Schema & Model Definition**: Utilizing `mongoose.Schema` and `mongoose.model()`  
- **CRUD Operations**:  
  - **Insert**: `save()`, `insertMany()`  
  - **Read**: `find()`, `findOne()`, `findById()`  
  - **Update**: `updateOne()`, `updateMany()`, `findByIdAndUpdate()` (with `{ new: true }` to return updated data)  
  - **Delete**: `deleteOne()`, `deleteMany()`, `findByIdAndDelete()`  




## Installation
```sh
npm install mongoose
```

## Connecting to MongoDB
```js
const mongoose = require('mongoose');

main()
    .then(() => console.log("Connection successful"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
```

## Defining a Schema & Model
```js
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    /*
    password: {
        type: String
        select: false   //It hides the password field by default when querying the database.
        //If you do need the password for authentication (e.g., login), explicitly select it:
        //User.findOne({ email: "johndoe@example.com" }).select("+password")
    },
    */
});

const User = mongoose.model("User", userSchema);
```

## CRUD Operations

### Insert Documents
#### Insert One
```js
const user1 = new User({name: "Adam", email: "adam@gmail.com", age: 48});
user1.save();
```

#### Insert Many
```js
User.insertMany([
    {name: "Tony", email: "tony@gmail.com", age: 50},
    {name: "Jack", email: "jack@gmail.com", age: 56},
    {name: "Jill", email: "jill@gmail.com", age: 24}
]).then(res => console.log(res));
```

### Read Documents
```js
User.find({age: {$gt: 40}}).then(data => console.log(data));
User.findOne({age: {$gt: 40}}).then(data => console.log(data));
User.findById("66bb8ec7e104af275d8283d2").then(data => console.log(data));
```

### Update Documents
```js
User.updateOne({name: "Jack"}, {age: 41}).then(res => console.log(res));
User.updateMany({age: {$gt: 40}}, {age: 50}).then(res => console.log(res));
User.findOneAndUpdate({name: "Jack"}, {age: 55}, {new: true}).then(res => console.log(res));
User.findByIdAndUpdate("66bb8ec7e104af275d8283d2", {age: 60}, {new: true}).then(res => console.log(res));
```
- In Mongoose, { new: true } option ensures that the updated document is returned instead of the old one.

### Delete Documents
```js
User.deleteOne({name: "Jack"}).then(res => console.log(res));
User.deleteMany({age: {$gt: 40}}).then(res => console.log(res));
User.findByIdAndDelete("66bb8d0d0e196aa24309c16f").then(res => console.log(res));
User.findOneAndDelete({age: {$gt: 40}}).then(res => console.log(res));
```

### Validations
```js
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters long"],
        maxlength: [100, "Title cannot exceed 100 characters"]
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [1, "Price must be at least 1"],
        max: [10000, "Price cannot exceed 10,000"]
    },
    discount: {
        type: Number,
        default: 0,
        min: [0, "Discount cannot be negative"],
        max: [100, "Discount cannot exceed 100%"]
    },
    category: {
        type: String,
        enum: {
            values: ["fiction", "non-fiction"],
            message: "Category must be either 'fiction' or 'non-fiction'"
        },
        required: [true, "Category is required"]
    },
    genre: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.length > 0;
            },
            message: "At least one genre must be specified"
        }
    },
    isbn: {
        type: String,
        unique: true,
        required: [true, "ISBN is required"],
        validate: {
            validator: function (v) {
                return /^[0-9-]+$/.test(v); // Only allows numbers and hyphens
            },
            message: "Invalid ISBN format"
        }
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, "Stock cannot be negative"]
    },
    publishedYear: {
        type: Number,
        min: [1000, "Enter a valid year"],
        max: [new Date().getFullYear(), "Year cannot be in the future"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});
```