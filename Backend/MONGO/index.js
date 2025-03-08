const mongoose = require('mongoose');

//mongoose.connect('mongodb://127.0.0.1:27017/test');

main()
    .then(() => console.log("connection successful"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model("User", userSchema);

//Insert One
// const user1 = new User({name: "Adam", email: "adam@gmail.com", age: 48});
// const user2 = new User({name: "Eve", email: "eve@gmail.com", age: 32});

// user1.save();
// user2.save();

//Insert Many
// User.insertMany([
//     {name: "Tony", email: "tony@gmail.com", age: 50},
//     {name: "Jack", email: "jack@gmail.com", age: 56},
//     {name: "Jill", email: "jill@gmail.com", age: 24}
// ]).then(res => {console.log(res)});

// User.find({age : {$gt : 40}}).then(data => console.log("###",data));
// User.findOne({age : {$gt : 40}}).then(data => console.log("##",data));
// User.findById("66bb8ec7e104af275d8283d2").then(data => console.log(data));

// User.updateOne({name: "Jack"}, {age: 41}).then(res => console.log(res));
// User.findOne({name: "Jack"}).then(data => console.log(data));

// User.updateMany({age : {$gt : 40}}, {age: 50}).then(res => console.log(res));
// User.find({age: 50}).then(data => console.log(data));

// User.findOneAndUpdate({name: "Jack"}, {age: 55}, {new: true}).then(res => console.log(res));
// User.findByIdAndUpdate("66bb8ec7e104af275d8283d2", {age: 60}, {new: true}).then(res => console.log(res));

// User.deleteOne({name: "Jack"}).then(res => console.log(res));
// User.deleteMany({age : {$gt : 40}}).then(res => console.log(res));
// User.findByIdAndDelete("66bb8d0d0e196aa24309c16f").then(res => console.log(res));
// User.findOneAndDelete({age : {$gt : 40}}).then(res => console.log(res));