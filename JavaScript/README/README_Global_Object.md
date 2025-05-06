# Window Object in JavaScript

## **Introduction**
The **Window Object** represents the browser window or a tab in which a web page is loaded. It is the topmost object in the browser's JavaScript hierarchy and serves as the **global object** for JavaScript code running in the browser.

---
## **1. Global Scope & Window Object** 🌍
- The **Window object** acts as the **global scope** for JavaScript code in a browser.
- Any **variables or functions declared globally** become properties and methods of the `window` object.

### **Example:**
```javascript
var globalVar = "I am a global variable";

function globalFunc() {
    console.log("I am a global function");
}

console.log(window.globalVar); // Output: I am a global variable
window.globalFunc(); // Output: I am a global function
```

---
## **2. Window Properties** 🏠
The `window` object provides properties to access information about the browser window:

- `window.innerWidth` → Width of the browser window’s viewport.
- `window.innerHeight` → Height of the browser window’s viewport.
- `window.location` → Represents the current page URL.
- `window.document` → Represents the HTML document loaded in the window.

### **Example:**
```javascript
console.log(window.innerWidth); // Output: Width of the browser window
console.log(window.location.href); // Output: Current page URL
```

---
## **3. Window Methods** ⚡
The `window` object provides various methods to interact with the browser window.

### **Commonly Used Methods:**
- `window.open(url, target, features)` → Opens a new browser window/tab.
- `window.alert("message")` → Displays an alert dialog.
- `window.confirm("message")` → Displays a confirmation dialog (returns `true/false`).
- `window.prompt("message")` → Displays a prompt dialog to take user input.
- `window.history.back()` → Navigates back in browser history.
- `window.location.href = "URL"` → Redirects to another page.

### **Example:**
```javascript
window.open("https://www.example.com", "_blank", "width=400,height=300");
window.alert("This is an alert message!");

var result = window.confirm("Are you sure you want to proceed?");
var name = window.prompt("Please enter your name:");

window.history.back(); // Go back to the previous page
window.location.href = "https://www.google.com"; // Redirect to Google
```

---
## **4. Event Handling with Window Object** 🎭
- The `window` object can listen for browser events like `load`, `resize`, `scroll`, and `click`.

### **Example:**
```javascript
window.addEventListener("load", function() {
    console.log("Page loaded!");
});

window.addEventListener("resize", function() {
    console.log("Window resized!");
});
```

---
## **5. `var`, `let`, and `const` with Window Object** 🔍
- **`var`** → Becomes a property of `window` (`window.varName`).
- **`let` & `const`** → Do **not** attach to `window`. They exist in the script scope but are not part of the global object.

### **Example:**
```javascript
var x = 10;
let y = 20;
const z = 30;

console.log(window.x); // Output: 10
console.log(window.y); // Output: undefined
console.log(window.z); // Output: undefined
```

---
## **Conclusion**
The `window` object plays a crucial role in JavaScript by serving as the global object and providing access to various properties and methods that allow interaction with the browser environment.