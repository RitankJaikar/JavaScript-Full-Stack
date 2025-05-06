# JavaScript Notes
Learning JavaScript Again...

From Hitesh Choudhary- Chai aur code.

Why learning JS?
If you want to learn just coding, then don't. If you want to build great project/product then only proceed.

Prettier for Code formatting

MDN -> JS docs
https://tc39.es/ -> https://tc39.es/ecma262/ -> JS standards/ Guideline (little complex)

Master JS-> Objects, Browser Events

DATATYPES:- (8)
*These are primitive datatypes: (7)
number (includes NaN), bigint, string, boolean
null -> e.g. let a = null;
undefined -> e.g. let a;
symbol -> unique (use in figma tools, symbols, unique components in react..)
*Non primitive datatypes (1) (reference type): Object (array is an object in JS)

How you store and how you access is just difference between primitive and non-primitive

Primitive -> Stack memory (gives copy if we use anywhere (deep copy)) (immutable)
Non-Primitive -> Heap memory (gives original address (shallow copy)) (mutable)

Method vs Function
Function declared normally or arrow function, as a variable or const
Methods are functions declared inside objects.

In JS to read or get input from user we can use:
-prompt()
    let input = prompt("Enter something:");
    console.log("You entered: " + input);
-HTML forms
-readline in Node.js

The "const" keyword is used to declare constants. Once a constant is assigned a value, it cannot be reassigned. However, the value itself can be mutable if it's a reference type like an object or array. For primitive types, once a value is assigned, it cannot be changed.

JavaScript is a single-pass interpreter, meaning that if it encounters a syntax error, it will not execute any part of the script. The interpreter will stop parsing as soon as it hits the invalid code. Therefore, the script will not execute any lines, even those before the error and throws error.
Errors that occur during execution, like trying to access an undefined variable, will stop the execution of the function where the error occurs, but not necessarily halt the entire script.

JavaScript code is execution:-
1. Parsing Phase
Syntax Checking: JavaScript first parses the code to check for syntax errors. If there are syntax errors, it will throw an error and stop execution before it starts.
Creation of Execution Context: During parsing, JavaScript creates an execution context that includes setting up the global context or function context, initializing variables, and function declarations.
2. Execution Phase
Execution of Code: After parsing, JavaScript starts executing the code line by line.
Function Execution: When a function is invoked, a new execution context is created for that function, and the function's code is executed within that context.

JS is synchronous and single threaded (by default). Execute one line of code at a time. Each operation waits for the last one to complete before executing.
Blocking Code- block the program to execute first
Non Blocking Code- do not block execution (callbacks, promises (fetch has higher priority), async/await) -> goes through task Queue (FIFO) -> then after processing complete again added to Call Stack(LIFO) (immediately executes)
Using Web API (DOM API) or Node enviroment JS can handle Async or Non Blocking Code too.
JS engine has only Call Stack and Memory Heap. 

Modern implementations of JavaScript, like Google's V8 engine, are primarily written in C++. V8 is Google's open source JavaScript engine.
https://github.com/v8/v8

Classes in JS: JavaScript does have classes, but they are more like syntactic sugar over its existing prototype-based inheritance model. In other words, while JavaScript provides the class keyword to define classes in a way that looks familiar to developers coming from object-oriented programming languages like Java or C++, under the hood, it’s still using prototypes.
So, JavaScript classes are not "classes" in the traditional sense. Under the hood, they're just functions and objects.
JavaScript is an object-oriented language (a programming paradigm), but it uses prototypes (Prototypes Based Language) instead of classes for inheritance and object creation. It’s a more flexible and dynamic approach to OOP compared to traditional class-based languages.