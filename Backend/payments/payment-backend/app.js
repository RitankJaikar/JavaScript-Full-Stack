const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const {v4: uuidv4} = require("uuid");
const crypto = require('crypto');

const PORT = 5000;
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const razorpayInstance = new Razorpay({
  key_id: process.env.RazorPayKeyId,
  key_secret: process.env.RazorPayKeySecret,
});

app.post('/create-order', async function (req, res) {
    const {amount} = req.body;
    try {
        const order = await razorpayInstance.orders.create({
            amount: amount*100, //converted to paise
            currency: "INR",
            receipt: "order_rcptid-"+uuidv4().slice(20),
        });
        res.json({orderId: order.id});
    }
    catch(err) {
        console.log(err);
    }
});

app.post('/verify-payment', async function (req, res) {
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;

    // Generate HMAC SHA256 hash using the Razorpay key secret
    // This hash is used to verify the authenticity of the payment
    //it generates hash, sha256 is a algorithm which is used by razorpay
    const generatedSignature = crypto.createHmac("sha256", process.env.RazorPayKeySecret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)  // Concatenating order ID and payment ID (in docs)
    .digest("hex"); // Convert the output to hexadecimal format

    console.log(generatedSignature);

    // Compare the generated signature with the one received from Razorpay
    if(generatedSignature === razorpay_signature) {
        res.json({
            success: true,
            message: "Payment verfied successfully"
        });
    }
    else {
        res.json({
            success: false,
            message: "Payment verification failed"
        });
    }
});



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});