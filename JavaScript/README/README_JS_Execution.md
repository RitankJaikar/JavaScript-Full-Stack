# **JavaScript Execution Context & Event Loop**  

## **1. Execution Context**  

### **Part 1: Memory Creation Phase 🧠**  
- **Hoisting occurs**: All variables and functions are allocated memory.  
- **Variables** are initialized as `undefined`.  
- **Functions** are stored **with their full definitions**, allowing them to be called **before** their actual declaration in the code.
- **Temporal Dead Zone (TDZ) for `let` and `const`**:  
  - `let` and `const` variables are hoisted but **not initialized**.  
  - Accessing them **before declaration** results in a **ReferenceError**.  
  - The period between hoisting and initialization is called **Temporal Dead Zone (TDZ)**. 

### **Part 2: Code Execution Phase ⚡**  
- Code runs **line by line**.  
- Executes functions when called, creating **new local execution contexts**.  

### **Global & Local Execution Contexts**   
- **Global Execution Context (GEC)**: Created when the script starts.  
- **Function Execution Context (FEC)**: Created whenever a function is called.
- **Call Stack (LIFO - Last In, First Out)**:  
  - Each function call creates a new execution context, which is pushed onto the **Call Stack**.  
  - Once execution is completed, the context is removed from the stack.  
  - Similar to **recursion**, where the last function call is resolved first.  

### **Global Execution Context (GEC)**
- JS starts with a **Global Execution Context** (GEC), which includes:
  - **Global Object (`window` in browsers, `global` in Node.js)**.
  - **`this` keyword**, which refers to the global object in the global scope.

### **`var`, `let`, and `const` with Global Object (`window`)**
- **`var`**: Becomes a property of the `window` object (`window.varName`).
- **`let` & `const`**: Do **not** attach to `window`. They exist in the script scope but not as properties of the global object.

```js
var a = 10;
let b = 20;
const c = 30;

console.log(window.a); // ✅ 10 (var is added to window)
console.log(window.b); // ❌ undefined (let is not added to window)
console.log(window.c); // ❌ undefined (const is not added to window)

console.log(this.a); // ✅ 10 (same as window.a in the global scope)
console.log(this.b); // ❌ undefined
console.log(this.c); // ❌ undefined
```

---

## **2. JavaScript Event Loop & Queues**  
The event loop is a mechanism in JavaScript that allows non-blocking, asynchronous execution by handling callbacks and promises while keeping the main thread free.

### **FIFO (First In, First Out) in Queues**  
- **Microtask Queue** has **higher priority** than the **Callback Queue**.

### **Queue Priorities & Execution Order**  
✅ **Microtask Queue (Higher Priority)**  
- **Promise Callbacks (`.then() / .catch()`)** → Executed **immediately** after the Call Stack is empty.  
- **`fetch()` API Response (`.then()`)** → Placed in the **Microtask Queue**, but **only after** receiving the network response.  

✅ **Callback Queue (Lower Priority)**  
- **setTimeout, setInterval, Event Listeners, etc.** → Placed in the **Callback Queue**, executed **after all Microtasks are done**.  

### **Key Execution Flow:**  
1️⃣ **Synchronous code executes first.**  
2️⃣ **Microtasks (`Promise.then()`) run before callbacks (`setTimeout()`).**  
3️⃣ **`fetch()` waits for the response before its `.then()` enters the Microtask Queue.**  
4️⃣ **Callback Queue tasks (`setTimeout`, Event Listeners) execute last.**  

---

### **Example for Better Understanding:**  
```javascript
console.log("1️⃣ Synchronous Task"); 

fetch("https://api.example.com/data")
  .then(() => console.log("3️⃣ Fetch Response (Microtask Queue)"));

Promise.resolve().then(() => console.log("2️⃣ Promise Resolved (Microtask Queue)"));

setTimeout(() => console.log("4️⃣ setTimeout (Callback Queue)"), 0);

console.log("5️⃣ Another Synchronous Task");
```

### **Expected Output:**  
```
1️⃣ Synchronous Task
5️⃣ Another Synchronous Task
2️⃣ Promise Resolved (Microtask Queue)
3️⃣ Fetch Response (Microtask Queue)
4️⃣ setTimeout (Callback Queue)
```

---

## **Key Takeaways**  
✅ **JS is single-threaded but non-blocking.**  
✅ **Microtask Queue (`Promise.then()`) runs before Callback Queue (`setTimeout`).**  
✅ **Execution Contexts follow LIFO (Last In, First Out) in the Call Stack.**  
✅ **Queues follow FIFO (First In, First Out).**

---

## **Lexical Scope & Closures 🔄**
### **Lexical Scope & Scope Chaining**
- **Lexical Scope**: Lexical scope means that a function can access variables from its own scope and outer scopes where it was defined, not where it is executed.
- **Scope Chaining**: If a variable is not found in the current scope, JS looks in parent scopes until the global scope is reached.

#### Example:
```javascript
let globalVar = "I'm global";

function outerFunction() {
  let outerVar = "I'm in outerFunction";

  function innerFunction() {
    let innerVar = "I'm in innerFunction";

    console.log(innerVar);   // ✅ Found in innerFunction -> "I'm in innerFunction"
    console.log(outerVar);   // ✅ Not found in innerFunction, looks in outerFunction -> "I'm in outerFunction"
    console.log(globalVar);  // ✅ Not found in innerFunction or outerFunction, looks in global scope -> "I'm global"
  }

  innerFunction();
}

outerFunction();
console.log(globalVar);  // ✅ "I'm global"
// console.log(outerVar);  // ❌ Error: outerVar is not defined (not accessible outside outerFunction)
// console.log(innerVar);  // ❌ Error: innerVar is not defined (not accessible outside innerFunction)
```

### **Closures 🏗️**
A closure is when a function remembers the variables from its lexical scope even after the outer function has executed.

#### Example:
```javascript
function outer() {
  let a = 10;  
  return function inner() {
    console.log(a);  // 'a' is still accessible due to closure
  };
}
const closureFunc = outer();  
closureFunc();  // Output: 10
```
**Explanation:**
- Here, closureFunc retains access to a, even though outer() has finished execution. This is a closure.



```js
//Hoisting & Execution Context in JavaScript
var a = 10;

function hello() {  // new functional/local execution context
  console.log(a); // undefined due to hoisting
  
  var a = 20; //`a` is now assigned 20 in function scope
  
  console.log(a); // 20
}

console.log(a); // 10 (global `a` is unaffected by `hello()`)

hello();
/*
- The `hello()` function has its own execution context.
- Inside `hello()`, `var a = 20` is hoisted but uninitialized, so the first `console.log(a)` logs `undefined`.
- The global `a` remains unaffected.
*/



// `var` is function-scoped, whereas `let` & `const` are block-scoped.
var b = 10; // ✅ Global variable (function-scoped)

//console.log(c)  // ❌ ReferenceError: Cannot access 'c' before initialization, due to TDZ
let c = 10; // ✅ Block-scoped variable, in script

d = 10; // ❌ Implicitly global (not recommended, should use `let` or `var`)
// This is NOT hoisted; it gets allocated during execution phase.

if (true) {  
  // This block creates a new scope but NOT a new execution context (only functions create new execution contexts)
  
  console.log(b); // ✅ 10 (global `b`, which is already assigned 10)
  var b = 20; // ❌ Redeclaring `b` in a block still affects the global `b`
  console.log(b); // ✅ 20 (updated global `b`)
  
  let c = 20; // ✅ New block-scoped `c`, does not affect outer `c`
  
  d = 20; // ❌ Updates global `d` (implicit global, should use `let` or `var`)
}
console.log(b); // ✅ 20 (updated global `b`) even outside block
```



## **Understanding `this` in JavaScript**
- In the **global scope**, `this` refers to the **global object** (`window` in browsers, `global` in Node.js).
- Inside **functions**, `this` depends on how the function is called.
- In **arrow functions**, `this` retains the value from the surrounding lexical scope.

#### Example:
```javascript
console.log(this); // In browsers, logs 'window'

if(true) {
  console.log(this); // In browsers, logs 'window'
}

function regularFunction() {
  console.log(this); // Depends on how it is called
}

const arrowFunction = () => {
  console.log(this); // Inherits from surrounding scope
};

regularFunction();
/*
In browsers (non-strict mode): Logs window (since regular functions, when called in the global scope, default to window).
In strict mode ("use strict"): Logs undefined (since this is not automatically bound to window).
*/
arrowFunction();
/*
Logs the surrounding scope's this, which in the global scope is window (in browsers) or global (in Node.js).
Arrow functions do not bind their own this but inherit it from their lexical scope.
*/
```

### **`this` in Methods (Normal vs Arrow Functions)**
#### Example with a Normal Function:
```javascript
const obj = {
  name: "Ritank",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};
obj.greet(); // Logs: "Hello, Ritank" -> Method direct call

let objGreet = obj.greet;// now this will point to global object, because objGreet is a reference to the function obj.greet, but it is no longer bound to obj
objGreet(); // "Hello, undefined" (or "Hello, [global object name]" in non-strict mode)
//To explicitly bind this to obj, use .bind():
let objGreetBind = obj.greet.bind(obj);
objGreetBind();  // "Hello, Ritank" -> Refrence call to function not method
```

#### Example with an Arrow Function:
```javascript
const objArrow = {
  name: "Ritank",
  greet: () => {
    console.log("Hello, " + this.name);
  }
};
objArrow.greet(); // Logs: "Hello, undefined" because `this` refers to the outer (global) scope
```

#### Example with Event Listener:
```javascript
const button = document.createElement("button");
button.innerText = "Click Me";
document.body.appendChild(button);

button.addEventListener("click", function() {
  console.log("Clicked!", this); // `this` refers to the button element
});

button.addEventListener("click", () => {
  console.log("Clicked!", this); // `this` refers to the outer scope (window in browser)
});
```

### **Key Takeaways:**
- **Normal functions**: `this` refers to the object calling the method.
- **Arrow functions**: `this` does **not** refer to the object but inherits from the surrounding scope (global scope in this case).
- **Event listeners**:
  - Using a normal function: `this` refers to the element that fired the event.
  - Using an arrow function: `this` refers to the surrounding scope (not the element).

---

## **"use strict"**
In strict mode (`"use strict";`), `this` in a regular function that is called globally (not as an object method) will be `undefined` instead of the global object.
```javascript
"use strict";
function showThis() {
  console.log(this);
}
showThis(); // Logs: undefined (instead of global object)

// Example of an error caught by strict mode:
// Uncommenting the following lines will cause an error because `a` is not declared.
// a = 10;
// console.log(a); // ReferenceError: a is not defined
```
Strict mode helps catch common JavaScript errors and enforces a cleaner coding style.