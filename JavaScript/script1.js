//"use strice"    //treates all JS code as newer version
//not important

// console.log("Hello World");

const id = 1234;
let userName = "ritank";
let accountState;  //undefined
var email = "ritank@gmail.com"; //outdated (never use)
                                //because of use in block scope 
                                //and functional scope

random = 999;   //new (without using keyword)
//its possible but not recommended
//it automatically becomes a global variable, can lead to conflicts with other variables and functions
//higher risk of accidentally overwriting existing variables
//throw error in Strict Mode

//; in JS is not necessary

console.table([id, userName, email, random, accountState]);   //new

//alert(1+2);     //throws error in node
//but will execute all code above, but not below
//as JS is interpreted language, runs code line by line

// Hoisting in JavaScript moves variable and function declarations to the top of their scope before execution. While function declarations are fully hoisted, variables (var, let, const) are hoisted but not initialized, with let and const remaining in the temporal dead zone until assigned.
// Function declarations are fully hoisted (both declaration and definition)
hoistedFunction(); // Works because the function is hoisted
function hoistedFunction() {
    console.log("Function is hoisted!");
}
// 'var' is hoisted but initialized as 'undefined' until assigned
console.log(hoistedVar); // undefined (declaration hoisted, value not assigned)
var hoistedVar = "var is hoisted!";
console.log(hoistedVar); // "var is hoisted!"
// 'let' and 'const' are hoisted but stay in the Temporal Dead Zone (TDZ)
// Cannot access 'let' before initialization
// console.log(hoistedLet); // ReferenceError: Cannot access 'hoistedLet' before initialization
let hoistedLet = "let is hoisted but in TDZ";
// Cannot access 'const' before initialization
// console.log(hoistedConst); // ReferenceError: Cannot access 'hoistedConst' before initialization
const hoistedConst = "const is hoisted but in TDZ";

//Temporal Dead Zone (TDZ)-  It is the period(lines of code) between when a variable is hoisted and when it is initialized. During this time, variables declared with let and const cannot be accessed and will throw a ReferenceError if used before initialization.
//err e.g.:- ReferenceError: Cannot access 'varName' before initialization

let a = null;
console.log(typeof(a));
// output: object -> JS LOL moment: due to a historical bug in the language, typeof null returns "object" instead of "null".  This is a known quirk of JavaScript that dates back to its early implementation.

// convert to number-> Number(value)
// "33" => 33
// "33abc" => NaN
// null => 0
// undefined => NaN
// true => 1, false => 0

//conversion-> Number(value), String(value), Boolean(value), Object(value), Array.from(value), new Date(value) (If called without new, it returns the current date and time as a string.)

console.log(typeof("1"+2)); //"12" (all string)
console.log(typeof(2+2+"1")); //"41"
console.log(typeof("1"+2+2)); //"122"
//Executes from left to right

console.log(typeof(+true)); //1 (converts to number)
console.log(+"3");  //converts to number or NaN

// typeof function is function (also called object function)

let num1, num2, num3;
num1 = num2 = num3 = 2+4;

const id1 = Symbol('123');
const id2 = Symbol('123');
console.table([id1, id2, id1 === id2]); //false

const bigInt = 1232412n;
// n suffix is required to indicate that this is a BigInt and not a regular number


let s1 = "String"; // type: string
let s2 = new String("String"); //type: object (Constructor Syntax)
//String objects are objects, and they behave differently from primitive strings.
//Name with Number object

let name = "Ri-ta-nk";
// .__proto__  -> all methods of Strings
// name[2], .trim() , .replace("Ri", "Ja"), .includes("Ri") , .substring(0,4), .slice(-4, 4), .replace("Ri"), .split("-", 2)) [2 is limit here] , .repeat(2) , .toUpper() , .toLower() , indexOf("t")

//Count digits of a number
let num4 = 999999;
console.log(num4.toString().length);

//Summ of all digits
let num4Array = Array.from(num4.toString(), (num) => Number(num));  //first convert num to string, then again convert to number in array
console.log(num4Array);
console.log(num4Array.reduce((acc,curr)=> acc+curr,0));

let num5 = 400;
console.log(num5.toFixed(4), num5);   //add 3 decimal -> 400.000 (string)
let num6 = 121.456;
console.log(num6.toPrecision(4), num6);   // Precision upto given digits -> 121.5 (string)

const hundreds = 100000000;
console.log(hundreds.toLocaleString()); //adds , -> us std
console.log(hundreds.toLocaleString("en-IN"));  //ind std

console.log(Number.MAX_VALUE, "  ", Number.MIN_VALUE, "  ", Number.MAX_SAFE_INTEGER);

console.log(Math, Math.PI, Math.abs(-10), Math.round(4.6), Math.ceil(4.2), Math.floor(4.9), Math.min(1,2,3,4), Math.max(1,2,3,4), Math.random());

let max = 20;   let min = 10;   //range -> both inclusive
console.log(Math.floor(Math.random()*(max-min+1) + min));   //formula random number in a range

// DATE in JS (date is object in JS )
// A Date object in JavaScript stores the number of milliseconds that have passed since January 1, 1970, at midnight UTC (called the epoch)
let myDate = new Date();    //Gives current UTC Data and time, can be adjusted to other time zone like IST
console.log(myDate);    //2024-09-04T11:54:53.790Z
console.log(myDate.toString()); //Wed Sep 04 2024 11:54:53 GMT+0000 (Coordinated Universal Time)
console.log(myDate.toISOString());  //2024-09-04T11:54:53.790Z
console.log(myDate.toJSON());   //2024-09-04T11:54:53.790Z
console.log(myDate.toDateString()); //Wed Sep 04 2024
console.log(myDate.toTimeString()); //11:54:53 GMT+0000 (Coordinated Universal Time)
console.log(myDate.toUTCString());  //Wed, 04 Sep 2024 11:54:53 GMT
console.log(myDate.toLocaleString());   //9/4/2024, 11:54:53 AM
console.log(myDate.toLocaleDateString());   //9/4/2024
console.log(myDate.toLocaleTimeString());   //11:54:53 AM

let newDate2 = new Date(2023,0,1);  //month starts with 0
console.log(newDate2.toDateString());   //Sun Jan 01 2023
let newDate3 = new Date(2000, 11, 8, 19, 45);   //my birthday
console.log(newDate3.toLocaleString()); //12/8/2000, 7:45:00 PM
let newDate4 = new Date("2024-1-16");    //Here montth start with 1
console.log(newDate4.toUTCString());    //Thu, 18 Jan 2024 00:00:00 GMT
let newDate5 = new Date("01-16-2024");  //alt version, works
console.log(newDate5.toUTCString());    //Thu, 18 Jan 2024 00:00:00 GMT

let newDate = Date.now();
console.log(newDate);   //current date in ms-> 1725453695466
console.log(newDate5.getTime());  //date in ms-> 1705363200000
console.log(Math.floor(Date.now()/1000));   //in sec, can be used to compare date and times

console.log(myDate.toLocaleString("default", {
    // weekday: "short",
    timeZone: "IST"     //ctrl+space for suggestion
}));

//check if valid date or not
function isDate(input) {
    // Check if the input is a valid Date object
    if (input instanceof Date) {
        console.log("input instanceof Date", input, input.getTime());
        return !isNaN(input.getTime()); // Return true if the date is valid, false if invalid (NaN)
    }
    
    // Check if the input is a string and can be parsed as a valid date
    if (typeof input === 'string' && !isNaN(Date.parse(input))) {
        console.log("input is string", input, Date.parse(input));
        return true;
    }

    // Check if the input is a valid timestamp (number)
    if (typeof input === 'number' && !isNaN(new Date(input).getTime())) {
        console.log("input is timestamp", input, new Date(input).getTime());
        return true;
    }

    // If none of the conditions match, return false
    return false;
}
// Examples:
console.log(isDate(new Date())); // true
console.log(isDate("2023-08-11")); // true
console.log(isDate("not a date")); // false
console.log(isDate(1625673600000)); // true (timestamp)
console.log(isDate("2023-08-11T12:00:00Z")); // true


//Arrays
let arr1 = [1,2,3];
let arr2 = new Array(1,2,3);    //Constructor Syntax: not prefered and both are same
let arr3 = new Array(3);    //Creates an empty array with 3 slots
// let arr4 = arr1.splice(0,2); //changes orig. array too
let init = 0;   //optional
let sum = arr1.reduce((acc, curr) => acc+curr, init);   //6
let num = arr1.find(item => item<2);    //1 (returns first matching value)
console.table([arr1,arr2, sum, num]);
// console.log([1] === [1]);   //false, compares the address

// .indexOf(1) , .includes(1)
// arr1.toString() , arr1.join() [both are same, but] , arr1.join("-") [can choose seprator in join]
// =>Change in orig. array:- .push(4) , .pop() , .unshift(0) [adds 0 to start, inc. TC] , .shift() [remove first ele]  , .reverse() , sort() , .splice(0,2) [returns the array as slice includes 2 also, but also cuts original array], .forEach() [if alter in ele]
// =>Change in or create copy array:- arr1.concat(arr2) , .slice(0,2) , .map() , .filter() , [...arr1] , .flat()
// .every() [Returns a boolean, true if all elements pass the test, false otherwise] , .some() [Returns a boolean, true if at least one element passes the test, false otherwise]
// arr1.reduce((acc, curr) => acc+curr, init); [sum of ele]  [init is optional, reduces array to single value, do not change orig.]
// forEach, map, filter, every, some, reduce, find are higner order functions (uses callbacks)
// Array.isArray(var) , Array.from(var) , Array.of(var1,var2,var3)

arr1.push(...arr2); //spread operator (creates copy)
console.log(arr1, Math.min(...arr1), Math.max(...arr1));

let arr4 = [1,2,[3,4,[5,6,[7,8]]]]; // too much depth
let arr5 = arr4.flat(Infinity); // can give number of depth of Infinity to spread all deapth
console.log(arr5);  // [1, 2, 3, 4, 5, 6, 7, 8]

console.log(Array.isArray("Name")); //false
console.log(Array.from("MyName"));  //[ 'N', 'a', 'm', 'e' ]
console.log(Array.from(Number(123).toString())); //[ '1', '2', '3' ]
console.log(Array.from({name: "Name"}.name));  //['N','a','m','e']

let n1=n2=n3=10;
console.log(Array.of(n1,n2,n3));    //[ 10, 10, 10 ]


//Objects
//3 ways to create object
//Constructor: let obj = new Object()     //empty object
//Object.create(prototype, propertiesObject)    //both are singleton
    //Provides fine-grained control over the prototype and property descriptors. Useful for creating objects with a specific prototype or when you need to set up complex inheritance.
//Object Literals: let obj = {}     //most used and faster

//access obj keys- obj.key (shortcut) or obj["key"] (actual)
//delete key- delete obj.key (not much used and recomended)

//all ways to declare and access key
let dynamicKey = 'dynamic';
let mySym = Symbol("key1");
let obj = {
    a: 1,
    [dynamicKey]: 2,
    "anotherKey1": 3,
    ["anotherKey2"]: 4,
    3 : 5,
    "" : 6,
    [mySym]: 7
}
console.log(obj);
console.table([obj.a, obj[dynamicKey], obj["anotherKey1"], obj.anotherKey2, obj["3"], obj[""], obj[mySym]]);

Object.freeze(obj); //Freezes the object, can not change or add keys

// ? -> optional chaining operator: It allows you to access properties of an object safely, without throwing an error if the object or property is null or undefined. It's useful for preventing runtime errors when accessing nested properties in objects.
//e.g. obj?.name will:
//Return the value of obj.name if obj exists.
//Return undefined if obj is null or undefined, without throwing an error.

// merge objects, Object.assign({}, obj1, obj2, obj3);
// let obj3 = {...obj1, ...obj2, ...obj3}  (better and easy)

console.log(Object.keys(obj));  //returns all keys in an array
console.log(Object.values(obj));   //returns array of values
console.log(Object.entries(obj));  ///returns array of [key, value] pairs
console.log(obj.hasOwnProperty('dynamic')); //true/false

//Destructure Object
let {a: key , dynamic} = obj;
console.log(key, dynamic);

//Destructure Array
let arr6 = [1,2,3];
let [v1, , v3, v4, v5=10] = arr6;
console.log(v1,v3,v4,v5);   //1 3 undefined 10

//Function
function print() {
    console.log("print");
}
//print   //reference
print()   //execution, call

//parameters vs arguments: argument is the actual value passed, parameter is just a place holder. (mdn refers parameters bec they are placeholders)
function add(a, b, c = 10) {  // a, b and c(with default) are parameters
    console.log(a);
    console.log(b);   //undefined if a or b is not passed as argument
    // return         //returns undefined
    //return a;       //returns undefined
    return a+b;       //returns NaN if a or b is not passed as argument
}
let result = add(1,2);   // 5 and 10 are arguments
console.log(result);


function calculateCartPrice(val1, val2, ...num) {   //this time its rest operator
    return num;
}
console.log(calculateCartPrice(10,20,30,40,50));   //[ 30, 40, 50 ]

//Scope
if(true) {
    let a2 = 1;
    const b2 = 2;
    var c2 = 3;    //Problematic (old, never recommended)
}
// console.log(a2 , b2);   //Out of scope (not defined, error)
console.log(c2)     //gives value but Problematic

//Closure (allow inner functions to access and remember variables from their outer functions, even after the outer function has executed
function one() {
    let p = "p";
    function two() {
        let q = "q";
        console.log(p); // "p" due to lexical scope
    }
    // console.log(q);  //error, out of scope
    two();  // Works fine, as 'two()' is called within 'one()'
}
one();
// Trying to call 'two()' outside 'one()' will result in an error:
//two(); // Error: two is not defined

let fun1 = function() { //variable as function, expression
    console.log("fun1");
}
//we can call normal function anywhere in the scope, but expression can be only called after declaring the variabe/variable as function/expression

console.log(this);  //{} -> global object, in browser its window object
let user = {
    name: "Ritank",
    message: function() {
        this.name = "Jaikar";   //changes the name
        console.log(this.name); //this refers to user object
    }
}
user.message();
function showThis() {
    console.log(this);  //represents the properties and methods available on the global object
}
// showThis();

let arowFun = () => {
    console.log("arrow function")
    console.log(this);  //{} -> refers global object
}
arowFun();
// let arowFun1 = (num1,num2) =>  num1+num2;    //return num1+num2
//or, better use second one, first may give problems
let arowFun2 = (num1,num2) =>  (num1+num2); //implicit return (other one is explicit return)

// IIFE- Immediately Invoked Function Expression (new for me)
(function iife1() {     //named IIFE
    console.log("Immediately invoke function1");
})();   //semi colon is importnt with IIFE
((fun) => {     //unnamed IIFE
    console.log(`Immediately invoke ${fun}`);
})("function2");
(function() {     //this syntax is also correct
    console.log("Immediately invoke function3");
})();
//Avoid polluting the global scope: It creates a private scope, preventing variables inside the IIFE from affecting the global environment. It can not be called globally. Its one time function.
//Execute code immediately: It runs the function as soon as it is defined, which is useful for initialization code.

// JS Execution Context
// - {} -> Global EC (this) or Globale Env., window in browser (always)
// - Function EC
// - Eval Exection Context

//Two JS ececution phase:-
// - Memory Creation Phase or Creation Phase ir Parsing Phase
    //creates space for for all variables with undefined, and for all function with their definition (cycle 1 complete)
// - Execution Phase
    //Does all the operations including calculations, assigining values to variables and for every function call it will New Variable Enviorment for Function EC with Execution Thread with again repeating cycle of Creation Phase and Execution Phase for this env. and after executing it gets deleted and returns to Global EC.

//Callstack- LIFO: Last In First Out (It a mechanism used by JavaScript to keep track of function calls and their execution contexts.)

//Things to remember- Execution Context, Global EC/Globale Env. (always), Function EC. Eval EC, 2 JS Exec. Phase, Cycle 1- Memory Creation Phase/Memory Phase/Creation Phase/Parsing Phase, Cycle 2- Execution Phase, New Variable Enviorment for Function EC. with Execution Thread, Callstack, LIFO

//Falsy Values: false, 0, -0, BigInt 0n, "", null, undefined, NaN
//Everything else is Truthy- surprise mf: "0", 'false', " ", [], {}, function(){} :these are Truthy

// Nullish Coalesscing Operator (??): null undefined
let val1;
val1 = 10 ?? 5;  //10
// val1 = null ?? 10;   //10
// val1 = undefined ?? 10;  //10
// val1 = null ?? 10 ?? 15; //10
// val1 = undefined ?? null;   //null
// val1 = null ?? undefined;   //undefined
console.log(val1);

//Map : the Map object is a collection of key-value pairs where both the keys and values can be of any data type. Maintains the insertion order of key-value pairs.
//Key Flexibility: Unlike objects, Map keys are not limited to strings or symbols—they can be any data type.
let map = new Map();
// Keys of different types
map.set('a', 1);           // String key
map.set(1, 'one');          // Number key
map.set(true, 'yes');       // Boolean key
map.set({name: 'John'}, 25); // Object key  //can be accessed directly
map.set(() => 'key', 'func'); // Function key //can be accessed directly **(first store key in variable then map.get(var))
// map.delete('key1');
// map.clear();
console.log(map.size, map.get(true), map.has('key1'));
// Using forEach
map.forEach((value, key) => {   //first value then key
    console.log(key, value);
});
// Using for...of
for(let [key, value] of map){
    console.log(key, value);
}

// Set: A collection of unique values, meaning no duplicates are allowed.
// Values can be of any data type (strings, numbers, objects, etc.).
let set = new Set();
// Adding values
set.add(1);                // Number
set.add('a');              // String
set.add({ name: 'John' }); // Object
set.add(1);                // Duplicate value (ignored)
// Check size and existence
console.log(set.size);     // 3 (unique values only)
console.log(set.has(1));   // true
console.log(set.has('b')); // false
// Deleting values
set.delete(1);             // Removes value '1'
console.log(set.has(1));   // false
// Iterating over Set
set.forEach(value => {
    console.log(value);    // Logs each value
});
for (let value of set) {
    console.log(value);    // Logs each value
}
// Converting Set to Array
let arrayFromSet = [...set];
console.log(arrayFromSet);
// Clearing all values
set.clear();
console.log(set.size);     // 0

//Iterate object: for in loop
let obj2 = {
    key1: 1,
    key2: 2,
    key3: 3
};
for (const key in obj2) {
    console.log(key,":",obj2[key]);
}
//Iterate array: for in loop  (for of is better for array)
for (const key in arr1) {   //key is index of array here
    console.log(key, arr1[key]);
}
//Map is not directly iterable, and for sure not with for in loop
//forEach
arr1.forEach((item, index, arr) => {    //arr -> full array
    console.log(item, index, arr);
});
//forEach does not return anything unlike map, filter, reduce, every & some

//PART 1 complete

//Promise: The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
//It has three states: pending, rejected, fulfilled
let newPromise = new Promise(function(resolve, reject) {
    setTimeout(function(){
        console.log("Async task 1");
        resolve();  //impt.
    }, 1000);
});
newPromise.then(() => {
    console.log("Async 1 resolved");    //prints after resolve();
});

new Promise(function(resolve, reject) { //direct
    //Do async task
    //DB calls, cryptography, network
    setTimeout(function(){
        let error = true;
        if (!error) {
            console.log("Async task 2");
            resolve({username: "rj", email: "rj@gmail.com"});
        }
        else {
            reject("Error");
        }
    }, 1000);
})
.then((user) => {
    console.log("Async 2 resolved");
    console.log(user);
    return user.username;
})
.then((username) => {
    console.log(username);
})
.catch(err => {
    console.log(err);
}).finally(() =>{   //always execute
    console.log("Promise is resolved or rejected. IDK.")
});

const newPromise3 = new Promise(function(resolve, reject) {
    setTimeout(function(){
        let error = true;
        if (!error) {
            console.log("Async task 3");
            resolve({username: "rj", email: "rj@gmail.com"});
        }
        else {
            reject("Error");
        }
    }, 1000);
});

async function asyncFun() {
    try {
        const res = await newPromise3; 
        const name = await res.username;
        console.log("Res: ", res);
        console.log("Name: ", name);
    }
    catch(err) {
        console.log(err);
    }
}
asyncFun();

fetch("https://api.github.com/users/ritankjaikar err")
.then(res => {
    return res.json();  //two step process with fetch
})
.then(data => {
    console.log(data);
})
.catch(err => {
    console.log(err);
});
//fetch returns Promise.
//fetch has highest priority, then any other async activity. Hence fetch is executed and returned first than other. Special Queue (Micro Task Queue or Priority Queue or Fetch Queue) is created for fetch.
//fetch was just introduced in NodeJS in 2022, before it was so difficult.
//fetch Promise does not reject HTTP errors (like 404, etc.)
//fetch working: res = fetch("something")
// 1. reserve space in memory -> Data:- onFullfilled[], onRejected[] (these can not be accessed directly/ private fields)
// 2. Web Browser/Node -> sends network request :- returns with fullfiled data or rejected data
// Finally Data is provided to alloted variable (res)

//OOP in JS- Object Oriented Programming (a programming paradigm- a style of programming)
//Object- Collection of properties and methods
// Topics- Object Literal(its object only- base unit), Constructor functions(), Prototypes, Classes, Instances(new, this), Getters, Setters
// this: current context (works differently in normal and arrow function)
// new keyword: use to create new instance or new context or copy

function newuser(name, pass) {  //constructor function
    this.newname = name;    //property
    this.newpass = pass;
    this.greeting = function() {
        console.log(`Welcome ${this.newname}`);
    }
    return this;    //not mandatory
}
const userOne = newuser("rj1", 123);
const userTwo = newuser("rj2", 456);    //will override all values in global
console.log("userOne", userOne);
//hence need to use new keyword
const userThree = new newuser("rj3", 789); //constructor function is called
const userFour = new newuser("rj4", 987);
console.log("userThree", userThree);
userFour.greeting();
console.log(userThree.constructor); //it is reference to its constructor function "newuser"
console.log(userThree instanceof newuser);  //true
console.log(userFour instanceof Object);   //true
//instanceof operator tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object

//JS has Prototypal Behaviour (in-built functionality): Prototypes are the mechanism by which JavaScript objects inherit features(properties and method) from one another.
//Every object in JavaScript has a built-in property, which is called its prototype. The prototype is itself an object, so the prototype will have its own prototype, making what's called a prototype chain. The chain ends when we reach a prototype that has null for its own prototype.
//(new keyword, this keyword, classes, inheritance are all possible due to Prototypes)
//Prototype -> Prototype(Array, String, Function,...) -> Prototype... -> Object(root) -> null   [Can not be backwords]
//While a string is a primitive data type in JavaScript, it is automatically wrapped in a String object when we try to access properties or methods on it (e.g. length, trim, slice, etc.)
//Functions in JavaScript are first-class objects. This means they are objects that can have properties and methods.
function greet(name) {
    this.name = name;
    console.log("Hello!");
}
greet.message = "This is a function property";
greet();   //Hello!
console.log(greet.message); //This is a function property
console.log(greet.prototype);   //{}
greet.prototype.sayMyName = function() {
    console.log(`Hello ${this.name}`);  //this ka matlab jis ne bhi bulaya
}
let greet1 = new greet("RJ");   //new keyword is impt. here
greet1.sayMyName(); //do not need to write .prototype

//BTS of new keword: - A new keyword initiates the creation of new JS object. - The newly created object gets linked to prototype properties of the constructor function. This means it has access to properties and methods defined on constructor's prototype. - The constructor function is called with the specified arguments and "this" is bound to the newly created object. - New object is returned

let myName = "   Ritank   ";
String.prototype.trueLength = function() {
    return this.trim().length;
}
console.log(myName.trueLength());   //6
console.log(myName);    //still same

Object.prototype.ritank = function() {
    console.log(`I am everywhere.`);
}   //new method is added to Object, now Objects, Arrays, Strings... can access this method
obj.ritank();
myName.ritank();    //ritank() is even available in String, since it is wrapped in Sring Object it can access Object methods due to Prototypal Inheritance

const TeacherUser1 = {
    name: "name1",
    email:  "name2@email.com"
}
const TeacherUser2 = {
    name: "name2",
    email:  "name2@email.com"
}
const Teacher = {
    teach: true
}
const TeachingSupport = {
    isAvailable: false
}
const TASupport = {
    makeAssignment: "JS assignment",
    fullTime: true,
    __proto__: TeachingSupport  //Prototypal inheritance
    //__proto__: Teacher    //cannot assign multiple prototypes
}
Teacher.__proto__ = TeacherUser1;    //another way (__proto__ is oudated approach)
Teacher.__proto__ = TeacherUser2;   // Now Teacher inherits from TeacherUser2, but loses connection to TeacherUser1
console.log(Teacher.email); //name2@emai.com
console.log(TASupport.isAvailable); //false
//modern syntax (works same as __proto__)
Object.setPrototypeOf(TeachingSupport, Teacher);    //TeachingSupport inherits properties from Teacher
console.log(TeachingSupport.teach);
console.log(TeachingSupport.name);  //Due to prototype chain

//JavaScript objects have a single prototype chain, meaning an object can only inherit from one other object directly (single inheritance model -> only one prototype at a time). This design simplifies the inheritance chain and avoids complexity that can arise from multiple inheritance, such as conflicts between properties and methods from different parent objects.

//.prototype is a property of constructor functions.
//.__proto__ is a property of all objects.

//call(): method of function instances allows to invoke functions in a specific context. "this" value and arguments provided individually
function SetUsername(username) {
    this.username = username;
    console.log("called");
}
function createUser(username, email, pass) {
    //SetUsername(username);    //its getting called but problem is execution context and call stack. It runs adds to call stack, create temporary memory, after execution its removed from call stack and temporary memory of variables are deleted
    SetUsername.call(this, username);   //"this" is impt. here, to give current execution context
    this.email = email;
    this.password = pass;
}
const newUser1 = new createUser("rj", "rj@email.com", 123)
console.log(newUser1.username);

//4 pillers in OOP:- Abstraction, Encapulation, Inheritance, Polymorphism

let baseSalary = 30000;     //Procedural Programming
let overtime = 10;
let rate = 20;
function getWage(baseSalary, overtime, rate) {
    return baseSalary + overtime*rate;
}
getWage(baseSalary, overtime, rate);    //three parameters, will be complex & difficult to handle when code base increases

let employee = {    //OOP
    baseSalary: 30000,
    overtime: 10,
    rate: 20,
    getWage: function() {
        return this.baseSalary + this.overtime*this.rate;
    }
}
console.log(employee.getWage()); //Better and scalable, the fewer the number of parameters, easier it is to maintin that function

//Abstraction: Abstraction hides the complexity by providing a simplified interface for interacting with an object. (Hiding unnecessary details and showing only essential information.)
function Car(make, model) {
    this.make = make;
    this.model = model;
    let engineNumber = "ABC123";  // Private detail
    
    this.getCarInfo = function() {
        return `${this.make} ${this.model}`;
    };
}
const myCar = new Car("Toyota", "Camry");
console.log(myCar.getCarInfo()); // "Toyota Camry"  //hides the logic, and simple interface
// Cannot access engineNumber directly

//Encapsulation: Bundling data (properties) and methods (functions) that operate on that data within one unit (object) and limits direct access to some of that data. (Encapsulate properties ans methods in on class)
function Person(name, age) {
    this.name = name;
    this.age = age;
    let company = "Google"; //private detail
    
    this.greet = function() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    };
}
const person = new Person("Alice", 25);
person.greet(); // "Hello, my name is Alice and I am 25 years old."

//Inheritance: It allows one class to inherit properties and methods from another/parent class.
const Animal = {
    isAlive: true,
    eat() {
        console.log("Eating...");
    }
};
const Dog = Object.create(Animal);
Dog.bark = function() {
    console.log("Woof!");
};
console.log(Dog.isAlive);  // true, inherited from Animal
Dog.eat();                 // "Eating...", inherited from Animal
Dog.bark();                // "Woof!", specific to Dog

//Polymorphism: Allows objects of different classes to be treated as instances of the same class through Method Overriding. It also enables a method to behave differently based on the object it is called on.
// Base Bird object
const Bird = {
    fly() {
        console.log("This bird is flying!");
    }
};
// Specific Bird types
const Eagle = Object.create(Bird);
Eagle.fly = function() {    //Method Overriding
    console.log("The eagle soars high in the sky!");
};
const Penguin = Object.create(Bird);
Penguin.fly = function() {
    console.log("Penguins can't fly, but they swim really well!");
};
const Sparrow = Object.create(Bird);
// Polymorphism in action
function birdFlight(bird) {
    bird.fly();
}
birdFlight(Eagle);    // "The eagle soars high in the sky!"
birdFlight(Penguin);  // "Penguins can't fly, but they swim really well!"
birdFlight(Sparrow);  // "This bird is flying!"

//Classes:- syntactical sugar over the existing prototype-based inheritance or same working as constructor functions
class Product { //Classes are a template for creating objects
    //constructor method is a special method of a class for creating and initializing an object instance of that class
    //every class can only have one constructor, and it is called everytime when an object is created via class
    constructor(name, id) {
        console.log("This is called for every new instance")
        this.name = name;   //class level variables or instance variables by using 'this' keyword, can be used throughout class
        this.id = id;
        let quantity = 1;   //this is private
        this.brand = function() {   //instance method: less memory-efficient- new copy of the method is created for each instance
            console.log("All product are under same brand");
        }
    }
    //prototype methods: memory-efficient as these are shared by all instances
    productCode() {
        return `${this.name}${this.id}`
    }
    changeProductName() {
        return this.name.toUpperCase();
    }

    //Static Properties: Store values shared by all instances of the class. They belong to the class, not any specific instance.
    //Static Methods: Define utility functions or logic that don't depend on instance-specific data.
    static code = "CODE";   //Static methods/prop (class level variable) are not accessible to instances, they can only be accessed via the class itself
    //static methods can only access static variables. Cannot access instance properties or methods because static members belong to the class itself, not to an instance
    static privateInfo() {  //restricts the access
        console.log("This is private Info.", this.code, Product.code);
    }

    // Private class-level variables (using # for private fields)
    #quantity = 1; // Private variable, only accessible within the class
    // Getter for private variables
    getQuantity() {
        return this.#quantity;
    }
    // Setter for private variables
    setQuantity(newQuantity) {
        if (newQuantity > 0) {
            this.#quantity = newQuantity;
        } else {
            console.error("Quantity must be greater than 0");
        }
    }
}
let newProduct = new Product("dettol", 123);
console.log(newProduct);
//newProduct.privateInfo(); //undefined: can not be accessed
console.log(Product.code);  //can be only accessed via class itself
Product.privateInfo();
console.log(newProduct.changeProductName());
newProduct.brand();
console.log(newProduct.__proto__ === Product.prototype); // true
// This shows that `newProduct.__proto__` points to `Product.prototype`

class ProdutDetails extends Product{    //inheritance
    constructor(name, id, detail) {
        //super keyword: to call the constructor of its parent class to access the parent's properties and methods
        super(name, id);    //can be called only once
        this.detail = detail;
    }
    details() {
        console.log("This is product details");
    }
}
const ProdutDetails1 = new ProdutDetails("cotton", 456, "Product Detail");
console.log(ProdutDetails1);
console.log(ProdutDetails1.changeProductName()); //can be accessed due to inheritance
console.log(ProdutDetails1.__proto__ === ProdutDetails.prototype); // true
console.log(ProdutDetails1.__proto__.__proto__ === Product.prototype); // true
// The prototype chain: `ProdutDetails1.__proto__` -> `ProdutDetails.prototype` -> `Product.prototype`

//Behind the scene (using constructor function)
function Product2(name, id) {
    this.name = name;
    this.id = id;
    let quantity = 1;   //Private property
    this.brand = function() {
        console.log("All product are under same brand");
    }
}
Product2.code = "CODE"; // Static property
Product2.printCode = function() { // Static method (extra)
    console.log(this.code);
}
Product2.privateInfo = function() { //these can not be accessed by instances
    console.log("This is private Info.");
}
Product2.prototype.productCode = function() {
    return `${this.name}${this.id}`
}
Product2.prototype.changeProductName = function() {
    return this.name.toUpperCase();
}
let newProduct2 = new Product2("dettol", 123);
console.log(newProduct2);
//newProduct2.privateInfo();
console.log(newProduct2.changeProductName());
newProduct2.brand();
console.log(Product2.code);
Product2.printCode();   //Static Method

function ProductDetails2(name, id, detail) {    //inheritance
    Product2.call(this, name, id);
    this.detail = detail;
}
ProductDetails2.prototype.details = function() {
    console.log("This is product details");
}
// Inheriting methods**
ProductDetails2.prototype = Object.create(Product2.prototype);
ProductDetails2.prototype.constructor = ProductDetails2;
const ProdutDetails2_1 = new ProductDetails2("cotton", 456, "Product Detail");
console.log(ProdutDetails2_1);
console.log(ProdutDetails2_1.changeProductName());

//Diff. b/w call and bind
//call e.g.
const Person1 = {
    fullname: function() {
        return this.first+" "+this.last;
    }
}
const Person2 = {
    first: "ritank",
    last: "jaikar"
}
console.log(Person1.fullname.call(Person2));    //"ritank jaikar" , no need of "this" here. Executes the function immediately.
//call() is used when you need to invoke the function immediately with a specific context.
//bind e.g.
const Person3 = {
    firstName: "Jane",
    lastName: "Doe",
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
};
const anotherPerson = {
    firstName: "ritank",
    lastName: "jaikar"
};
const getFullName = Person3.fullName.bind(anotherPerson);    //Returns a new function that can be called later
console.log(getFullName()); // Output: "ritank jaikar"
//.bind() is useful when you need to pass a function as a callback and want to ensure it runs with a specific context.

//Object in depth. There are many hidden methods of Objects.
//Q. Can you change value of Math.PI
console.log(Math.PI);
Math.PI = 10;   //can not, fails
console.log(Math.PI);
const descriptor = Object.getOwnPropertyDescriptor(Math, "PI");
// Trying to modify the descriptor (fails due to configurable: false)
/*Output: {
    value: 3.141592653589793,
    writable: false,
    enumerable: false,
    configurable: false
}*/
descriptor.writable = true;
descriptor.enumerable = true;
descriptor.configurable = true;
descriptor.value = 10;
console.log(descriptor.value);  //changes locally in the descriptor object, but not in Math.PI
console.log(Math.PI);   //still same
//A. Math.PI can not be changed

//check descriptor of custom object
let newObj = {
    key1: 1,
    key2: "value"
}
console.log(Object.getOwnPropertyDescriptor(newObj, "key1"));
//customomize descriptor or custom property
Object.defineProperty(newObj, "key1", {
    writable: false,    //can not be changed
    enumerable: false   //now can not be accessed via loop
});
console.log(Object.getOwnPropertyDescriptor(newObj, "key1"));   //changed
newObj.key1 =10;
console.log(newObj.key1);   //1

//Getters and Setters: Special methods use to define how properties of an object are accessed and modified.
//if one is defined then both need to be defined. or You can define a getter without a setter to create a read-only property. Conversely, you can define a setter without a getter to create a write-only property.
//_ :is a convention indicating that this property is intended to be private. Also to differentiate between the internal property and the getter/setter methods
//e.g. length is defined in Array bts using these
class User {
    constructor(email, password){
        this.email = email;
        this.password = password;
    }
    get password() {    //to get/access value, method on password(impt. to have same name as property)
        //return this.password.toString();    //err (now issue in get)
        console.log('Getter called');
        return this._password.toString();   //return getters
    }   //_password is now private property
    set password(value) {   //to set/modify/validate value
        //this.password = value;  //err, Maximum call stack size exceeded, its getting called again and again. here conflict is constructor is also setting password and set is also setting password.(issue in set)
        console.log('Setter called');
        if (value.toString().length >= 6) {
            this._password = value; //do not return setters
        }
        else {
            console.log("Password is too short!");
        }
    }
}
const rj1 = new User("rj@email.com", 123456); //setter Called
console.log(rj1.password);   //getter called, 123456, 
rj1.password = 1234; //setter called, Password is too short!
//getters and setters are called when they need to be called independently

//bts, same using constructor function
function User2(email, password) {
    this.email = email;
    this._password = password;
    Object.defineProperty(this, 'password', {
        get: function() {
            console.log('Getter called');
            return this._password.toString(); // Return the password as a string
        },
        set: function(value) {
            console.log('Setter called');
            if (value.toString().length >= 6) {
                this._password = value; // Set the private password if validation passes
            } else {
                console.log("Password is too short!"); // Log error if validation fails
            }
        }
    });
}
const rj2 = new User2("rj@email.com", 456789);
console.log(rj2.password);
rj2.password = 456;    //similar outputs

//getter & setter in Object, rare
const User3 = {
    _email: "rj@email.com",
    _password: 123456,
    get password() {
        console.log('Getter called');
        return this._password.toString();
    },
    set password(value) {
        console.log('Setter called');
        if (value.toString().length >= 6) {
            this._password = value;
        } else {
            console.log("Password is too short!");
        }
    }
}
console.log(User3.password);
User3.password = 123;   //similar outputs

//Lexical scope and closure
function outside() {
    let name = "Outside"; // name is a local variable created by outside
    function inside() {
        // inside() is the inner function, that forms a closure
        console.log("inside:", name); // use variable declared in the parent function
    }
    inside();
    return inside;
}
outside();  //inside: Outside, due to lexical scoping
const outsideFun = outside();   //inside: Outside, full lexical scope of outside is returned not just just inside
outsideFun(); //inside: Outside, due to closure
//Real world issue -> refer index1.html

//Private class fields are a feature in modern JavaScript (introduced in ECMAScript 2022) that allow you to define properties within a class that are only accessible from within the class itself. These properties are prefixed with a # and cannot be accessed or modified from outside the class. Benefits: Better than before, Encapsulation, Data Integrity, Clear Syntax
class subUser {
    #password; // Private field
    constructor(email, password) {
        this.email = email;
        this.#password = password; // Initializing private field
    }
    // Getter method for private password field
    getPassword() {
        return this.#password; // Accessing private field
    }
    // Setter method for private password field
    setPassword(newPassword) {
        if (newPassword.length >= 6) {
            this.#password = newPassword; // Modifying private field
        } else {
            console.log("Password is too short!");
        }
    }
}
const subUser1 = new subUser("user@example.com", "initialPassword");
console.log(subUser1.getPassword()); // Output: "initialPassword"
// Trying to access private field directly will result in a syntax error
// console.log(user.#password); // SyntaxError: Private field '#password' must be declared in an enclosing class
subUser1.setPassword("newPassword");
console.log(subUser1.getPassword()); // Output: "newPassword"
subUser1.setPassword("short"); // Output: "Password is too short!"
console.log(subUser1.getPassword()); // Output: "newPassword"

//PART 2: Complete