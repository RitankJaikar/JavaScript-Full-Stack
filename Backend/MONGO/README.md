# Mongoose Quick Guide

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
    age: Number
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

### Delete Documents
```js
User.deleteOne({name: "Jack"}).then(res => console.log(res));
User.deleteMany({age: {$gt: 40}}).then(res => console.log(res));
User.findByIdAndDelete("66bb8d0d0e196aa24309c16f").then(res => console.log(res));
User.findOneAndDelete({age: {$gt: 40}}).then(res => console.log(res));
