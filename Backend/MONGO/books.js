const mongoose = require("mongoose");

main()
    .then(() => {
        console.log("connectioon successful");
    })
    .catch((err) => console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

const bookSchema =  new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    price: {
        type: Number,
        min: [1, "Please Enter Valid Price"]
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ["fiction", "non-fiction "]
    },
    genre: [String]
});

const Book = mongoose.model("Book", bookSchema);

// let book1 =  new Book({
//     title: "Gone Girl3",
//     price: 400,
//     category: "fiction",
//     genre: ["crime","drama"]
// });
// book1
//     .save()
//     .then(res => console.log(res))
//     .catch(err => console.log(err));

Book.findByIdAndUpdate (
    '66c88da4cd809f9655596619',
    { price: -600 },
    { runValidators: true, new: true }
)
    .then(res => console.log(res))
    .catch(err => console.log(err.errors.price.properties.message));