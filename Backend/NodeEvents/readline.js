const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputs = []; // Array to store inputs
let count = 0;  //Tracks the number of lines read
let n;  //Determines how many more lines to store (first line/input)

rl.on("line", (line) => {
  if (count === 0) {
    // First line contains the number of inputs to be read
    n = parseInt(line.trim(), 10);
  } else {
    // Store the input in the array
    inputs.push(line.trim());
  }

  count++;

  // Close the readline interface once we have received 'n' inputs
  if (inputs.length === n) {
    rl.close();
  }
});

rl.on("close", () => {
  console.log("Collected Inputs:", inputs);
});