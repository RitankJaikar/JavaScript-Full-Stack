const mongoose =  require("mongoose");
const Chat = require("./models/chat.js");

main()
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const allChats = [
    {
        "from": "neha",
        "to": "priya",
        "msg": "Send me your exam sheets",
        "created_at": new Date()
    },
    {
        "from": "rahul",
        "to": "simran",
        "msg": "Do you want to meet up for coffee later?",
        "created_at": new Date()
    },
    {
        "from": "anita",
        "to": "john",
        "msg": "Can you review my project proposal?",
        "created_at": new Date()
    },
    {
        "from": "michael",
        "to": "lisa",
        "msg": "Happy birthday! 🎉",
        "created_at": new Date()
    },
    {
        "from": "sara",
        "to": "elena",
        "msg": "I found the book you were looking for.",
        "created_at": new Date()
    },
    {
        "from": "vikram",
        "to": "meera",
        "msg": "Have you completed the report?",
        "created_at": new Date()
    },
    {
        "from": "rajesh",
        "to": "pallavi",
        "msg": "Let’s schedule a call for tomorrow.",
        "created_at": new Date()
    },
    {
        "from": "divya",
        "to": "arjun",
        "msg": "Check out the new article I sent you.",
        "created_at": new Date()
    },
    {
        "from": "neeraj",
        "to": "kriti",
        "msg": "Are you coming to the meeting?",
        "created_at": new Date()
    },
    {
        "from": "tina",
        "to": "rajesh",
        "msg": "Don’t forget the deadline is tomorrow!",
        "created_at": new Date()
    }
];

Chat.insertMany(allChats);