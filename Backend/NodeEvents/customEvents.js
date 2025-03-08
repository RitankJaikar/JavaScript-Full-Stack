const EventEmitter = require("events");

// Create a custom event emitter class
class MyEmitter extends EventEmitter {}; //not mandatory

// Initialize the event emitter
const myEmitter = new MyEmitter();

// ------------------------------
// 1️⃣ .on() → Register an event listener
// ------------------------------
myEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

// ------------------------------
// 2️⃣ .emit() → Trigger an event
// ------------------------------
myEmitter.emit("greet", "Ritank"); // Output: Hello, Ritank!

// ------------------------------
// 3️⃣ .addListener() → Alias for .on()
// ------------------------------
myEmitter.addListener("bye", (name) => {
  console.log(`Goodbye, ${name}!`);
});

myEmitter.emit("bye", "Ritank"); // Output: Goodbye, Ritank!

// ------------------------------
// 4️⃣ .once() → Fires only once
// ------------------------------
myEmitter.once("welcome", (user) => {
  console.log(`Welcome, ${user}! This will run only once.`);
});

myEmitter.emit("welcome", "Ritank"); // Output: Welcome, Ritank!
myEmitter.emit("welcome", "John");   // No output (since it runs only once)

// ------------------------------
// 5️⃣ .off() / .removeListener() → Remove a specific event listener
// ------------------------------
const farewell = (name) => {
  console.log(`Farewell, ${name}!`);
};

myEmitter.on("farewell", farewell);

myEmitter.emit("farewell", "Ritank"); // Output: Farewell, Ritank!

myEmitter.off("farewell", farewell); // Removing the listener
myEmitter.emit("farewell", "Ritank"); // No output (listener removed)

// ------------------------------
// 6️⃣ .removeAllListeners() → Remove all listeners for an event
// ------------------------------
myEmitter.on("test", () => console.log("Test event triggered!"));
myEmitter.on("test", () => console.log("Another test event triggered!"));

myEmitter.emit("test"); // Output: Both test event listeners run

myEmitter.removeAllListeners("test"); // Remove all 'test' event listeners
myEmitter.emit("test"); // No output (all listeners removed)

// ------------------------------
// 7️⃣ .listenerCount() → Get number of listeners for an event
// ------------------------------
myEmitter.on("countCheck", () => console.log("Count event 1"));
myEmitter.on("countCheck", () => console.log("Count event 2"));

console.log(myEmitter.listenerCount("countCheck")); // Output: 2

// ------------------------------
// 8️⃣ .eventNames() → Get all event names currently registered
// ------------------------------
console.log(myEmitter.eventNames()); // Output: [ 'greet', 'bye', 'countCheck' ]





/*

Method	Description
.on(event, listener)               ->	  Registers an event listener (fires every time the event is emitted).
.emit(event, ...args)              ->	  Triggers an event and passes arguments.
.addListener(event, listener)      ->	  Alias for .on().
.once(event, listener)             ->	  Registers a one-time event listener (fires only once).
.off(event, listener)              ->	  Removes a specific event listener (Node.js v10+).
.removeListener(event, listener)   ->	  Alias for .off().
.removeAllListeners(event)         ->	  Removes all listeners for the specified event.
.listenerCount(event)              ->	  Returns the number of listeners for an event.
.eventNames()                      ->	  Returns an array of registered event names.
*/