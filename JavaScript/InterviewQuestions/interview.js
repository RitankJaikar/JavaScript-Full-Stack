//Q1. Loop an array though its own property.
//Counter question: u mean to loop array to its original properties, and exclude the prototypal properties if any?
Array.prototype.ritank = "ritank";
let arr = [5,6,7,8];
for (const ele of arr) {
    console.log(ele);
}   //5 6 7 8
for (const key in arr) {
    //console.log(arr[key]);  //5 6 7 8 ritank
    if(arr.hasOwnProperty(key)){    // hasOwnProperty: useful with objects
        console.log(arr[key]);  //5 6 7 8
    }
}

console.log("----------------------------");

//Q2. Custom forEach
//Sol1- create a function
function myForEach(arr, callback) {
    if(!Array.isArray(arr)){
        console.log("Not Array");
        return;
    }
    else if(typeof callback !== "function") {
        console.log("Please pass valid function");
        return;
    }
    for(let i=0; i<arr.length; i++) {
        callback(arr[i], i, arr);
    }
}
const arr2 = [3, 4 , 5, 6];
myForEach(arr2, (ele, i, arr) => {
    console.log(i, " ", ele);
});
//Sol2: create new prototype for array, better
Array.prototype.myForEach = function(callback) {
    if(typeof callback !== "function") {
        console.log("Please pass valid function");
        return;
    }
    for (let index = 0; index < this.length; index++) {
        callback(this[index], index, this);
    }
}
arr2.myForEach((ele, i) => {
    console.log(i, " ", ele);
});
//Sol4: just lil adv (might be lil overkill)
Array.prototype.myForEach2 = function(callback, thisContext) {
    if(typeof callback !== "function") {
        throw "Please pass valid function";
    }
    for (let index = 0; index < this.length; index++) {
        if(this.hasOwnProperty(index)) {
            callback.call(thisContext, this[index], index, this);
        }
    }
}
arr2.myForEach2((ele, i) => {
    console.log(i, " ", ele);
}, this);

console.log("----------------------------");

// console.log(100.toString()); //err
// . -> decimal places or . -> accessing property/method in Object
console.log((10).toString()); //"10"
console.log(10..toString());  //"10"

// Custom console.mytable() Function
console.mytable = (vars) => {
    Object.entries(vars).forEach(([key, value]) => {
        console.log(key, " -> ", value);
    })
}
/*
let name = "Ritank";
let age = 24;
let isDev = true;
console.mytable({ name, age, isDev });
Output-
// name -> Ritank
// age -> 24
// isDev -> true
*/

function fun1() {
    var2 = 2;
    return var1 = 1;   //adds to global variable after fun1() is called
}
console.log(fun1()); // 1
console.mytable({var1, var2}); //only after fun1() is called, otherwise var1, var2 are undefined
//Bad practice

console.log( 108 == ['108'] );     //true

const obj = {};
if(obj && obj.data && obj.data.person) console.log(obj.data.person);
//better (optional chaining)
console.log(obj?.data?.person); //undefined

console.log([1,10,3,20].sort());    //[1, 10, 20, 3]
// The default behavior of the .sort() method in JavaScript is to sort elements as strings. This means it will compare their string representations instead of their numeric values.
console.log([1,3,4,5,10,3,20].sort((a,b)=> a-b));   //JS uses TimeSort (hybrid sorting algorithm derived from merge sort and insertion sort)

//Flatten array
let arr3 = [1,2,[3,4,[5,6,[7,8]]]];
console.log(arr3.flat(Infinity));
//Infinity is global property is a numeric value representing infinity

//Boxing Process- When you try to access a property or method on a primitive value, JavaScript automatically converts that primitive into an object (this process is known as boxing) so that you can work with it as an object.

//swap in js, a=10, b=5
//1. temp = a , a = b, b = temp
//2. a=a+b , b=a-b , a=a-b
//3. a=a^b , b=a^b , a=a^b
//4. [a,b] = [b,a]

const num1 = 8_00_00_000;   //it works
console.log(num1);      //80000000

const name = "name";
age = 23;   //undeclared variable, adds to window scope as property
console.log(delete name);   //false
console.log(age)    //23
console.log(delete age) //true
// console.log(age) //error its deleted

// confirm for Confirmation Dialog.
// const confirmation = confirm("Do you want to proceed?");
// if (confirmation) {
//     alert("You clicked OK. Proceeding...");
// } else {
//     alert("You clicked Cancel. Exiting...");
// }

//in JavaScript, the division operator (/) does not perform integer division like it does in some other languages (e.g., Python or C++), it actually results in a floating-point number. So need to use Math.floor() for positive number and Math.ceil() in negative number to get same results.

//eval() is used to evaluate the string(consider items inside string as real code)
console.log(eval("num1"));

console.log(name.charCodeAt(1));   //97- ASCII value of "a"
console.log(String.fromCharCode(97))    //97- ASCII value of "a"

//Blob (Binary Large Object) is useful for handling and manipulating raw binary data, including text strings, images, audio, and other binary files. It can accurately measure the string's size in bytes, which is particularly helpful when handling Unicode characters that can vary in byte size. **This is only for brouser.
// const myString = "Hello, 🌎!";
// const blob = new Blob([inputString]);
// console.log(blob, blob.size);   //12, get the size in bytes
//NodeJS alternative is Buffer.
const myString = "Hello, 🌎!";
const size= Buffer.byteLength(myString, 'utf8');
console.log(size);

console.log((20).toString(2));  //10100, converts to binary in string

//.localeCompare()  -useful in .sort() for lexical comparison
console.log("a".localeCompare("b"));    //-1
console.log("b".localeCompare("a"));    //1


//Shallow vs. Deep Copy
//Shallow Copy: Copies only the first level of an object/array. Nested objects/arrays still reference the original.
//Example: Object.assign({}, obj), Spread operator { ...obj }, [...arr]

//Deep Copy: Recursively copies all levels, creating a completely independent copy.
//Example: structuredClone(obj), JSON.parse(JSON.stringify(obj) (limitations with functions, dates, etc.), libraries like lodash (_.cloneDeep).

//Ways to Copy
let origObj = {a: 1, b: 2, c: {d: 3, e: 4, f: {g: 5, h: 6}}};
let origArr = [1, 2, [3, 4, [5, 6, [7, 8]]]];
let shallowObj1 = Object.assign({}, origObj);	//Shallow	//Simple objects
let shallowObj2 = { ...origObj };	//Shallow	//Simple objects
let shallowArr1 = [...arr];	//Shallow	//Arrays
let deepObj1 =  structuredClone(origObj);	//Deep	//Modern and robust
let deepObj2 =  JSON.parse(JSON.stringify(origObj));	//Deep	//Avoids references; has limitations
//let deepObj3 = _.cloneDeep(origObj);	//Deep (lodash)	//Complex //objects/arrays


/*
Mouse Events in JavaScript (Paired for Similarity):-
- mouseEnter & mouseLeave:
Triggered when the mouse enters or leaves the boundaries of an element.
Does not bubble to parent elements.
More specific than mouseOver/mouseOut.

- mouseOver & mouseOut:
Triggered when the mouse moves over or moves out of an element or its children.
Bubbles to parent elements, unlike mouseEnter/mouseLeave.

- mouseDown & mouseUp:
Triggered when the mouse button is pressed down (mouseDown) or released (mouseUp) on an element.

- mouseMove:
Triggered whenever the mouse moves over an element (fires continuously as the mouse moves).
*/


//n is Fibonacci  number if
//5n^2+4 is a perfect square
//5n^2-4 is a perfect square


//async/await function returns Promise. e.g.
async function example() {
    return 42; // Equivalent to Promise.resolve(42)
}
example().then(console.log); // Logs: 42


//short prewritten JavaScript code for user input using readline in Node.js:
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const userInput = [];
rl.on("line", (input) => {
    userInput.push(input);
});

rl.on("close", () => {
    let input = userInput;
    console.log(input);
    //for input in same line e.g.- 10 20 30. Output- ["10 20 30"]
    //for input in different line e.g.-
    // 10 20 30
    // 40 50
    // 60.  Output- ["10 20 30", "40 50", "60"]
})



//selection sort- (outer loop) i=0 till n-1  || (inner loop)  j=i+1 till n (j++),  if(arr[i]>arr[j]) swap
//sorting in a way smallest element comes/placed to start and goes on.

//insertion sort- (outer loop) i=1 till n  ||  (inner loop) j=i till 1 (j--), while(j>0 && arr[j]<arr[j-1]) swap
//sorting in a way substrings becomes sorted starting from start to end.

//bubble sort- (outer loop) i=1 till n  || (inner loop) j=0 till n-i (j++),  if(arr[j]>arr[j+1]) swap
//sorting in a way largest element is placed to the end, it can be optimized by for best case: isSwapped= false; then break;


//OOPS- It is a programming paradigm based on concept of objects and classes. It has four pillers- Encapsulation, Inheritance, Abstraction, Polymorphism
//Object- It is an instance of a class, or we can se it consist of key value pair, values can be properties, methods, arrays, objects, etc.
//Class- It is a blueprint for to create an object, which consist of properties and methods. Or it as syntactical sugar for existing prototype-based inheritance or same working as constructor functions. It is created using "class" keyword, and inside this constructor function can be called using "constructor" keyword used to create and initialize object instance for that class.
//Encapsulation- It means encapsualting/holding all properties and methods in the class itself.
//Inheritance- It means accessing inheriting properties and methiods from parent class to child class using "extends" and "super" keyword.
//Abstraction- It means hiding all the logic/unnecessary details/complexity and giving simplified interface for intraction with the object.
//Polymorphism- It means not being rigid, but can change accodingly. e.g. using method-overriding we can change method for different objects.



// Big difference between async/await (sequential) and then/catch (concurrent)

async function fetchData() {
    const urls = ["https://api.example.com/data1", "https://api.example.com/data2", "https://api.example.com/data3"];
    // async/await executes each fetch sequentially (one after another)
    for (let url of urls) {
        let response = await fetch(url);  // Waits for each fetch to complete before moving to the next
        let data = await response.json(); // Waits for JSON parsing
        console.log(data);  // Logs data one by one, after each request completes
    }
}
fetchData();

function fetchData() {
    const urls = ["https://api.example.com/data1", "https://api.example.com/data2", "https://api.example.com/data3"];
    // .then/.catch executes all fetch calls concurrently (at the same time)
    urls.forEach(url => {
        fetch(url)  // Each fetch runs immediately without waiting for others
        .then(response => response.json())  // Handles the result as each fetch resolves
        .then(data => console.log(data))  // Logs data as each promise resolves
        .catch(error => console.error(error));  // Catches individual errors
    });
}
fetchData();


// Create a dummy promise using setTimeout
const dummyPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // Simulating an asynchronous task that resolves after 2 seconds
        const success = true; // Change this to false to simulate rejection

        if (success) {
            resolve("Task completed successfully!");
        } else {
            reject("Task failed!");
        }
    }, 2000);  // 2 seconds delay
});
  
// Execute the dummy promise
dummyPromise
.then(result => {
    console.log(result);  // Logs: Task completed successfully!
})
.catch(error => {
    console.error(error);  // Logs: Task failed! (if success is false)
});
    

//All Promise methods-
/*
Promise.all()           ✅	Waits for all promises to resolve, fails if any one rejects.
Promise.allSettled()    ✅	Waits for all promises, returns an array of results (both resolved & rejected).
Promise.race()          ✅	Returns the first promise to settle (resolved or rejected).
Promise.any()           ✅	Returns the first fulfilled promise, ignores rejections (fails only if all reject).
Promise.resolve(value)  ✅	Instantly creates a resolved promise with the given value.
Promise.reject(error)   ❌	Instantly creates a rejected promise with the given error.
*/

const p1 = new Promise(res => setTimeout(res, 1000, "P1 resolved"));
const p2 = new Promise((_, rej) => setTimeout(rej, 500, "P2 rejected"));
const p3 = new Promise(res => setTimeout(res, 2000, "P3 resolved"));

Promise.all([p1, p2, p3])
.then(console.log)
.catch(console.error); // ❌ Rejects as soon as p2 fails

Promise.allSettled([p1, p2, p3]).then(console.log); // ✅ Returns array with status of all

Promise.race([p1, p2, p3]).then(console.log).catch(console.error); // ✅ Logs "P2 rejected" (first settled)

Promise.any([p1, p2, p3]).then(console.log).catch(console.error); // ✅ Logs "P1 resolved" (first successful)

Promise.resolve("Resolved instantly");

Promise.reject("Something went wrong");



/*
Linked List:-
Array disadvantage is it takes O(n) for insertion and deletion.
Linked does not have continous nature unlike Array.
Linked list stores nodes as array stores elements. Every node/element can have different addresses (not contionous).
Every node has element/value(1) and address(2) to next node. Last node has null as address.
*/
//e.g. for visulation
let linedlist = {
    value: 100,
    next: {
        value: 200,
        next: {
            value: 300,
            next: null
        }
    }
}
//print all values
let current = linedlist;
while(current !== null) {  //by loop
    console.log(current.value);
    current = current.next;
}
function getAllValue(current) {  //by recursion
    if(current === null)   return;
    console.log(current.value);
    getAllValue(current.next);
}
getAllValue(linedlist);

//Creation, Push, Pop, Display,... in Linked List
class Node {
    constructor(value) {
        this.value = value; // The value of the current node
        this.next = null;   // Pointer to the next node, initially null
    }
}

class LinkedList {
    constructor(head) {
        this.head = head;
    }

    push(value) {   // Method to add a new node at the end of the linked list
        const newNode = new Node(value);    // Create a new node with the given value
        if(!this.head) { //null
            // If the list is empty, set the new node as the head
            this.head = newNode;
        }
        else {
            let temp = this.head;
            while(temp.next) {
                temp = temp.next;
            }
            temp.next = newNode;    // due to shallow copy this.head will also update
            // console.log(this.head);
        }
    }

    pop() {   // Method to pop a node at the end of the linked list
        if(!this.head) { //null
            console.log("The list is empty");
            return;
        }
        if(!this.head.next) {    // If there's only one node in the list
            this.head = null;
            return;
        }
        // Traverse the list to find the second-to-last node
        let temp = this.head;
        while(temp.next.next) {
            temp = temp.next;
        }
        temp.next = null;
    }

    insertNodeAtHead(value) {  //insert 
        let newNode = new Node(value);
        // Point the new node's next to the current head
        newNode.next = this.head;
        // Update the head to be the new node
        this.head = newNode;
    }

    insertNodeAtPosition(value, position) {
        let newNode = new Node(value);
        
        // Traverse the list to find the position
        let current = this.head;
        let index = 0;
        
        // Traverse to the (position - 1)-th node
        while(current !== null && index < position -1) {
            current = current.next;
            index++;
        }

        // If position is out of bounds
        if (current === null) {
            throw new Error("Position out of bounds");
        }
        
        newNode.next = current.next;
        current.next = newNode;
    }

    reverseList() {
        let current = this.head;
        // Initialize 'prev' to null to mark the end of the reversed list
        let prev = null;
        // Traverse through the linked list
        while (current) {
            // Temporarily store the next node
            let temp = current.next;
            // Reverse the direction of the 'next' pointer
            current.next = prev;
            // Move 'prev' to the current node
            prev = current;
            // Move 'current' to the next node in the original list
            current = temp;
        }
        // Update the head to point to the new head of the reversed list
        this.head = prev;
    }

    middleNode() {
        let current = this.head;
        let length = 0;
        while(current) {
            current = current.next;
            length++;
        }
    
        current = this.head;
        let middle = Math.floor(length/2);
        let i = 0;
        while(i < middle) {
            current = current.next;
            i++;
        }
    
        console.log("Middle: ", current);
    }

    display() { // Method to display all values in the linked list
        let temp = this.head;
        while(temp) {
            console.log(temp.value);
            temp = temp.next;
        }
    }
}

let linkedList1 = new LinkedList(null); // Initialize an empty linked list
linkedList1.push(1); // Add 1
linkedList1.push(2); // Add 2
linkedList1.push(3); // Add 3
linkedList1.display();  // Output: 1, 2, 3
linkedList1.pop(); //removes last node
linkedList1.display();  // Output: 1, 2
linkedList1.insertNodeAtHead(0);
linkedList1.display();  // Output: 0, 1, 2
linkedList1.insertNodeAtPosition(0.5, 1);
linkedList1.display();  // Output: 0, 0.5, 1, 2
linkedList1.reverseList();
linkedList1.display();  // Output: 2, 1, 0.5, 0
linkedList1.middleNode();   //Output: 0.5, 0