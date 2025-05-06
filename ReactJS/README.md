# Learning ReactJS

### Why to learn React?
hype, job, trend, build UI ✗
makes easy to manage & build COMPLEX front end ✓

### When should I learn React?
after mastering JS ✓
most project don't need react in initial phase

### Why react was created?
Facebook's Ghost/Phantom message problem. (Notification icon/number problem in FB chatbox- Even after reading the message the icon/number was not vanishing)
This was due to sync problem b/w State handeled by JS & UI handled by DOM.
One of the first adoption-> Khan Academy, Unsplash
Best thing about react is its consistency.

### Don't learn React if-
if you don't know how JS works or DOM works

### React learning process
- go in-depth: Babel, fibre, Virtual DOM, diff algo, hydration
- by making projects(one topic at a time): todo, calculator, GitHub API, Weather App... ✓

## React is a Library
Framework: Military (strict)
Library: Cool Dude (more freedom)

## Topics to learn
-> core of React (state or UI manipulation, JSX- JavaScript XML)
-> component reusability
-> flow of data/properties  (props)
-> how to propogate change (hooks)

## Additional addon to react
- Router (React don't have router)
- State management (React don't have state management)
    Redux with Redux toolkit, zustand, context API
- class based component (old)
    legacy code
- BAAS Apps
    social media clone, e-commerce app,...
    e.g appwrite, firebase, superbase

## After React
- Backend
- React is not complete solution in most case
    no SEO, browser render of JS, no routing
- Framework
    NextJS, Getsby, Remix


# React Notes

Why React?
Efficiency: React updates only the changed parts of the DOM using the virtual DOM, making it faster and more efficient, especially for complex UIs. React automates UI updates when data changes, reducing manual DOM handling and bugs.
Code Organization: React’s component-based architecture allows for cleaner, reusable, and easier-to-maintain code with better performance and easier Updates.
State Management: React provides a structured way to handle dynamic data changes with state and props.

Traditional- HTML, CSS & JS to be diff. file.
React- It segregate on the basis of Components. Every component has its own HTML, CSS and JS. And reuse the Component whenever needed.

React -> Web- React DOM , Mobile- React Native

First Step -> Check package.json

npx -> node package executor

CRA: Create React App
- npx create-react-app basic-react-app (bulky, instead use vite)
- npm run start or npm start
- npm run build -> creates a build folder, this command compiles project into optimized static files (usually HTML, CSS, and JavaScript) ready for production

Vite: Bundler Library
- npm create vite@latest -> basic-react-app-2 (light, recommended)
- npm i
- npm run dev

index.html -> SPA (Single Page Application)
<noscript> -> defines an alternate content to be displayed to users that have disabled scripts in their browser or have a browser that doesn't support script.
ReactDOM -> Virtual DOM created by React
Even though there is no script tag in index.html, still index.js gets loaded. This due to "react-scripts".
While using Vite it directly add script in index.html to save one step. And there is no "react-scripts" in package.json.
In normal React .js will work for Components.
While in Vite it will not work. It needs to be .jsx.
<></> -> Fragment
Naming Convention -> Component Name + Component File Name should be same starting with Captial letter. (if not captial letter might give error).

<MyApp/> -> MyApp() will also work. But don't.
<MyApp/> is parsed to convert into the DOM tree by a parser like Bable (transpiler).
{variable} -> evaluated expression (final outcome only). if, for... will not work.
React Source Code -> https://github.com/facebook/react/tree/main

Virtual DOM -> The Virtual DOM (VDOM) is a lightweight copy of the actual DOM (Document Object Model) used in libraries like React.js to optimize UI updates and improve performance.
How It Works:
- React creates a Virtual DOM representation of the UI.
- When state changes, a new Virtual DOM is created.
- React compares the new and old Virtual DOMs using a diffing algorithm.
- Only the changed parts are updated in the real DOM (not the entire page).
Advantages:
✅ Faster Updates – Reduces direct manipulation of the real DOM.
✅ Efficient Rendering – Updates only necessary components.
✅ Better Performance – Minimizes costly reflows and repaints.

Why React is Better Than Manual JS DOM Manipulation?
Performance Optimization 🚀
React uses a Virtual DOM, which updates only the changed elements, making it faster than direct DOM manipulation (which causes frequent reflows & repaints).
- Efficient State Management ⚡
React handles UI updates automatically when state changes, whereas in vanilla JS, you have to manually select and update elements.
- Component-Based Architecture 🏗️
React allows you to reuse components, making code more structured and maintainable, unlike vanilla JS where you manage everything manually.
- Declarative UI 🎨
In React, you describe the UI (JSX), and React handles rendering, whereas in vanilla JS, you have to imperatively manipulate the DOM (document.createElement, appendChild, etc.).
- Better Scalability 📈
React is ideal for large applications due to its modular structure, whereas direct DOM manipulation gets messy and hard to manage.

Why do we need hooks?
To control and updation in the UI.
ReactDOM.createRoot -> creates a Virtual DOM.
React Fibre -> https://github.com/acdlite/react-fiber-architecture
In a UI, it's not necessary for every update to be applied immediately; in fact, doing so can be wasteful, causing frames to drop and degrading the user experience.
Different types of updates have different priorities — an animation update needs to complete more quickly than, say, an update from a data store.
React Fiber is one of the React's core algorithm. (to update virtual DOM)
- Key Features- Ability to set priority, pause, abort or reuse as new update comes in. (Hydration- is simply the process of attaching JavaScript behavior to HTML elements that have been generated on the server)
Reconciliation: Reconsiders what to update. Uses to differentiate one tree with another (Browser DOM tree and React Virtual Tree). It is algo. behind what is understood as "Virtual DOM". Helps to re-render selective parts in DOM without re-rendring full DOM.
Fibre is ground-up rewrite of Reconciler called Fibre Reconciler.
Key Points:
- Some components(old tree) are just replaced by new tree without compare to save a step.
- Diffing of lists is performed using keys. Keys should be "stable, predictable, and unique."
Fibre Functanility:
- pause work and come back to it later
- assign priority to different types of work
- reuse previously completed work
- abort work if it's no longer needed

React Hooks- useState, useEffect, useCallback, useRef, useId, useContext

Interview Q: For every re-render(by any hook), it computes all the values again. So, sometimes we don't need state for every variable. During the process of re-rendring, it other variable may compute again and renders the computed value, depends on the your logic and relationship amoung variables and states.

Interview Q: Will Re-render or not?
const [value, setValue] = useState(1);
1. function clickMe() { setValue(value+1) } //Yes
1. function clickMe() { setValue(value) } //No
3. function clickMe() { setValue(1) }   //No
4. function clickMe() { setValue(2) }   //Only one or two time, then no
const [value, setValue] = useState({key: 1});
5. function clickMe() { setValue(value) } //No
6. function clickMe() { setValue({...value}) }  //Yes
7. function clickMe() { useState({key: 1}) }  //yes
8. function clickMe() { useState(prev => prev) }  //No
9. function clickMe() { useState(prev => {...prev}) } //Yes

useState CASE:-
const [count, setCount] = useState(10);
setCount(count + 1); // count is 10, sets it to 11 (but not yet updated)
setCount(count + 1); // count is still 10 in this function call, so it sets it to 11 again
setCount(count + 1); // again, count is still 10, sets it to 11
- So, if only need to update once then we can update directly as argument.
- But, if need to update multiple times then use callbacks.

Lazy initialization (for optimization of useState) in useState allows you to optimize performance by initializing the state only when it is first used, rather than on every render. This is useful when the initial state calculation is expensive. React will call this function only once, during the initial render.
e.g.
const [state, setState] = useState(() => {
  // Expensive computation
  console.log("Initial computation");
  return computeInitialState();
});

Async Behavior of useState (AsyncUseState)
In React, useState updates are batched and asynchronous, meaning the state doesn’t update immediately after calling setState. React optimizes rendering by grouping multiple updates in a single render cycle, which improves performance.
const [count, setCount] = useState(0);
const handleClick = () => {
  setCount(count + 1); // Scheduled, but not updated immediately
  setCount(count + 2);
  setCount(count + 3);
  console.log(count);  // Logs the old value due to batching i.e. 0
};
// Result after one click: count is updated to 3 not 6 (last one), which proves its sync but behaves async.
// By batching updates, React ensures efficient rendering and reduces unnecessary re-renders.


useEffect:-
It is used to handle side effects in functional components.
side effects e.g.- fetching data, updating DOM, etc.
*It always executes on first render. Further:
Case1- useEffect(() => {
  // Code to run on every render
}); //No Dependencies
Case2- useEffect(() => {
  // Code runs only on the first render
}, []);
Case3- useEffect(() => {
  // Code runs when length, numAllow, or charAllow changes
}, [length, numAllow, charAllow]);

useEffect Behavior: Sync but Appears Async
Synchronous Nature: useEffect is synchronous in execution, but it runs after the render phase, making it appear asynchronous.
Purpose: Used for side effects (e.g., fetching data, subscriptions, DOM updates) that don’t block rendering.
React Phases:
1. Render Phase:
React prepares the UI based on state/props but doesn’t interact with the DOM yet.
useEffect is not called during this phase.
2. Commit Phase:
React updates the DOM and applies changes.
After the DOM update, useEffect is executed.
e.g.
useEffect(() => {
    console.log("First useEffect");
}, []);
useEffect(() => {
    console.log("Second useEffect");
}, []);
Output-
First useEffect
Second useEffect
//This demonstrates that useEffect is scheduled synchronously and executes callbacks sequentially after the render and commit phases.

Mounting: Happens when a component is added to the DOM.
useEffect with no dependency ([]) or an empty array runs once after the initial render.
Unmounting: Happens when a component is removed from the DOM.
useEffect cleanup runs before the component is unmounted.
useEffect Cleanup:(Purpose) Prevent memory leaks and remove unnecessary resources like event listeners, timers, or intervals.
The cleanup function in useEffect is executed: 1. Before the next effect re-runs (if dependencies change). 2. During unmounting, to clean up resources.
e.g.
const [count, setCount] = useState(0);
console.log("Effect running");
useEffect(() => {
    function handleSize() {
        console.log("Window Size", window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleSize);
    let setIntervalId = setInterval(()=>{ console.log("*", count); },1000);
    let setTimeOutId = setTimeout(()=>{ console.log("^", count) }, 1000);
    // cleanup
    return (() => {
        console.log("Cleanup before next effect/re-render or before unmount");
        window.removeEventListener("resize", handleSize);
        clearInterval(setIntervalId);
        clearTimeout(setTimeOutId);
    });
}, [count]);
return(
    <div>
          <h1> Hello from Cleanup </h1>
          <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
)

---------------------------------------------------------------------------------------------------------------------------------

useCallback:-
It is used to memoize callback functions, ensuring that they are not recreated on every render. This can optimize performance by preventing unnecessary re-renders of child components or expensive operations triggered by callback functions.
const cachedFn = useCallback(fn, [dependencies, ...])
Why Use useCallback?
Performance Optimization: Prevents unnecessary re-renders of child components that depend on the callback.
Without useCallback, the function(a normal function) would be recreated on every render.
e.g. const memoizedCallback = useCallback(() => {
  console.log('This callback is memoized');
}, [dependency1, dependency2]);
The callback is recreated whenever any of the specified dependencies change.
When to use? When need to optimize performance, especially with functions that are passed to child components or perform expensive operations or want stable reference between renders.

---------------------------------------------------------------------------------------------------------------------------------

useRef:-
It is used for accessing DOM elements or storing mutable values that do not trigger re-renders when updated/ value changes.
e.g. const inputRef = useRef(null);
useEffect(() => {
  inputRef.current.style.backgroundColor = "red";
  inputRef.current.focus(); // Focuses the input on component mount
}, []);
return <input ref={inputRef} />;

---------------------------------------------------------------------------------------------------------------------------------

useId:-
It is used to generate unique IDs for components.
e.g. const id = useId(); // Generates a unique ID
(Do not call useId to generate keys in a list.)

---------------------------------------------------------------------------------------------------------------------------------

React Router
- npm install react-router-dom
It is a library used to manage navigation in React applications. Feature: Dynamic Routing, Single-Page Application(SPA), Multi-page-like Behavior, Manages URL, Performance ✓, Nested Routes, Route Parameters (e.g., /user/:id to pass an id to a component)
Key Components-
-> <Link>: Allows navigation between routes without refreshing the page. It used for basic navigation between routes (<a> tag is not recommended in React directyly because it refreshes/reloads the page)
<Link to="#">Link</Link>
-> <NavLink>: Enhanced version of Link. Can change CSS on the basis of current link is active or if we are on current route.
Using Callback:
<NavLink to="/user" className={({isActive}) =>` ${isActive ? "text-orange" : "text-grey"}}>User</NavLink>
Using class:
.active {
  color: text-orange;
}
-> useNavigate: a hook for Programmatic navigation without rendering a link.
e.g. const navigate =  useNavigate();
<button onClick={() => navigate("/home")}> Button </button>
<button onClick={()=>navigate(1)}>Go Forward</button>
<button onClick={()=>navigate(-1)}> Go Backward</button>
-> <Outlet />: it is like children
-> <RouterProvider router={router}/>
-> createBrowserRouter([...])
-> createBrowserRouter(createRoutesFromElements(...))
-> <BrowserRouter>
-> <Routes>
-> <Route>
-> useParams()
-> useLoaderData()      //all these usecase below
-> useSearchParams***
Recommended Folder Structure:
everything in "/src":
"Components" folder contains all individeaul Component Folders.
It also contains "index.js" to export every single component from here.
"App.jsx" not Require. Remaining files in "/src":
"root.jsx" -> Contains <Outlet />
e.g. <>
        <Header />   -> on every page
        <Outlet />   -> dynamic, on the bases of route
        <Footer />   -> on every page
      </>
"main.jsx" -> All routing here <RouterProvider router={router}/>
e.g.
3 ways:
1. Tree of Arrays and Objects (Parent, Children):
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [       //this is <Outlet />
      {
        path: '',
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      }
    ]
  }
])
2. HTML like tree structure (Parent, Children): (best)
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      {/* <Route path='contact' element={<Contact />} /> */}
      {/* New */}
      <Route path='contact' element={<Contact />} >
        <Route path='person1' element={<Person1 />} > /* Will open person1 inside contact */
          <Route path='person1info' element={<Person1Info />} />
        </Route>
      </Route>
      <Route path='contact/person2' element={<Person2 />} >  /* More Specific, will open person2 seperate */
          <Route path='person2info' element={<Person2Info />} />
      </Route>
      <Route path='user/:userid' element={<User />} />  ->dynamic userid, to access- const {userid} = useParams();
      <Route
        path='github'
        element={<GitHub />}
        loader = {githubInfoLoader}  -> async function, just to optimize and store data in cache, to reduce load time. to access- const data = useLoaderData();
      />
      {/* New */}
      <Route path="*" element={<NotFound />} />
      <Route path='searchparamsexample' element={<SearchParamsExample  />} />
    </Route>
  )
)
e.g. useSearchParams-
const [searchParams, setSearchParams] = useSearchParams();
// Get a specific query parameter
const name = searchParams.get('name');
const age = searchParams.get('age');
// Function to update search parameters
const updateParams = () => {
  setSearchParams({ name: 'John', age: '25' });
};
return (
  <div>
    <h1>Query Parameters</h1>
    <p>Name: {name || 'Not provided'}</p>
    <p>Age: {age || 'Not provided'}</p>
    <button onClick={updateParams}>Update Query Params</button>
  </div>
);
3. using BrowserRouter and Routes
import { BrowserRouter, Routes } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Root />}>
        <Route path='' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='user/:userid' element={<User />} />
        <Route
          // loader = {githubInfoLoader}  //does not support loader
          path='github'
          element={<GitHub />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
)
// Use BrowserRouter: For simpler setups and manual data fetching (via hooks like useEffect).
// Use createBrowserRouter: When you want to leverage loader, action, ErrorBoundary, or other advanced features of react-router-dom.

---------------------------------------------------------------------------------------------------------------------------------

*Problem- Props or state passing(Prop drilling) chain is be a problem for big/complex/large projects. Becaue you could have to pass the props through several children components to be recevied by required component. There could be many cases like this in large projects. This is a problem.
Here comes libraries and hooks which solve this issue of state management:
- Context API (hook, only for react)
- Redux, React Redux, Redux Toolkit(RTK)
- Zustand

---------------------------------------------------------------------------------------------------------------------------------

Context API (useContext)
https://react.dev/reference/react/useContext
createContext()
const value = useContext(SomeContext)
Context is just the global variale(s). It eleminates prop drillng.

Steps- (Way-1)
1. Create "context" folder which contain all the context
e.g. "UserContext":
const UserContext = React.createContext();
export default UserContext;   //provides: {Provider : componet, Consumer : componet }
// This UserContext will allow any component to access or provide the "user" data. Think of it as a container where you’ll store data.
2. Now create Provider for this context same folder. e.g.
// Provider for user context
export default const UserContextProvider = ({children}) => {
    const [user, setUser] = React.useState(null);  // Global state
    return(
        // Makes user data and setUser function available to all children components
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
// The Provider component makes the context data (state) available to any components that need it. The Provider wraps the entire part of your app that needs to access the context.
3. Login.jsx- Send Data
const [username, setUserName] = useState(''); // Local state to store username input
const {setUser} = useContext(UserContext); // Access setUser from context to update the global user state
function handleSubmit(e) {
    e.preventDefault();
    setUser({username}); // Send the input username to the global state
}
**Or (hard way): using Consumer instead of useContext-
return (
  <UserContext.Consumer>
    {({ setUser }) => (
        <form onSubmit={(e) => handleSubmit(e, setUser)}>
            ...same
        </form>
    )}
  </UserContext.Consumer>
)
4. Profile.jsx- Access Data
const {user} = useContext(UserContext); // Access the global user data from context
if(!user || !user.username) return <div>Please Login</div>
return <div>Welcome {user.username}</div>
**Or (hard way): using Consumer instead of useContext-
return (
    <UserContext.Consumer>
      {({ user }) =>
          ...same
      }
    </UserContext.Consumer>
);
5. App.jsx- Wrapping the App with the Provider
<UserContextProvider>
  <Login />
  <Profile />
</UserContextProvider>
// The UserContextProvider wraps the Login and Profile components so they both can access the user context.
// Login can update the user, and Profile can display it.

Steps- (Way-2)
In this 1. and 2. are merged toghther in single file. createContext(), Provider and useContext() all togther.
// Define the context with a default values
export const UserContext = createContext({
    user: null,
    setUser: () => {}
});
// Provide the Context
export const UserContextProvider = UserContext.Provider;
// Custom hook for consuming the UserContext easily, to use context in components
export default function useUser() {
    return useContext(UserContext);
}
3. App.jsx- using the new UserContext approach
const [user, setUser] = useState(null);   // Global state for user, need to be same as default values
  <>
    <UserContextProvider value={{user, setUser}}>
      <Login />
      <Profile />
    </UserContextProvider>
  </>
4. Login.jsx- const { setUser } = useUser();
5. Profile.jsx- const { user } = useUser();
The second approach streamlines the creation and usage of context by merging context and provider in one file, while using a custom hook for easier access to the context. It simplifies the process and reduces boilerplate code.

//visualize -without context api it looks like this
/*function App() {
  const [user, setUser] = useState(null); // Managing the user state in App component
  return (
    <div>
      // Pass down setUser to Login, and user to Profile as props 
      <Login setUser={setUser} />
      <Profile user={user} />
    </div>
  );
}*/

---------------------------------------------------------------------------------------------------------------------------------

LocalStorage- (it stores data in string format)
  useEffect(() => {         //localStorage get
    const todoList = JSON.parse(localStorage.getItem("todos"));   // Retrieve data
    if(todoList && todoList.length>0) {
      setTodoList(todoList);
    }
  }, []); //first render
  useEffect(() => {         //localStorage set
    localStorage.setItem("todos", JSON.stringify(todoList));  // Save data
  }, [todoList]); //whenever change in todoList
  // localStorage.removeItem('key');  // Remove data
To Check- Inspect -> Application -> Local Storage

Storage Duration: Persists even after the browser is closed.
Capacity: Up to ~5MB.
Use Case: Storing user preferences or data that doesn't expire.

---------------------------------------------------------------------------------------------------------------------------------

SessionStorage-
sessionStorage.setItem('key', 'value'); // Save data
const value = sessionStorage.getItem('key'); // Retrieve data
sessionStorage.removeItem('key'); // Remove data

Storage Duration: Data is cleared when the browser tab is closed.
Capacity: Similar to LocalStorage (~5MB).
Use Case: Temporary storage like form data during navigation in the same session.

---------------------------------------------------------------------------------------------------------------------------------

Cookie-
Storage Duration: Can be set to expire at a specific time or persist for a session.
Capacity: ~4KB per cookie.
Use Case: Storing small, secure data like authentication tokens.
document.cookie = "key=value; expires=Fri, 18 Jan 2025 12:00:00 UTC; path=/"; // Save data

---------------------------------------------------------------------------------------------------------------------------------

Redux- It is an independent state management library for JavaScript applications. It helps manage the application state in a predictable way, making it easier to understand and debug.
To integrate with React, we have React-Redux comes with Redux itslef.
Before Redux there was Flux. (now outdated)

- Single Source of Truth
Centralized State: The Redux store serves as the centralized state management system for your application, storing all global variables and stateful data instead of individual components.
Global Access: State in the Redux store can be accessed from any component, avoiding the need for prop drilling.
State Management: Instead of managing state locally in components, manage state by dispatching actions to the Redux store, which triggers updates in connected components.
- Benefits
Avoiding Prop Drilling: Reduces the need to pass data through multiple component layers, simplifying structure.
Predictability: With a single source of truth, Makes data flow and state changes easier to understand.
Easier Debugging: Centralizes state management, allowing for better tracking of actions and state changes.
We prefer Redux over Context in large applications because Redux offers better performance and scalability by avoiding unnecessary re-renders, managing complex state logic, handle asynchronous actions more effectively/efficiently and providing a more structured and centralized way to handle state, while Context is better suited for simpler use cases with less frequent state updates.

- React Redux: It is implementation of Redux(core library), for wiring b/w React and Redux.
- ReduxToolkit: toolset for efficient Redux development. Official, recommended way to write Redux logic. It simplifies the process and reduces boilerplate code.
Redux introduced Single Source of Truth.
- Store: GLobal Variable, nothing but JS object. This is the single source of truth for the application state. It holds the state and allows access to it via methods. Best practice is to have a single global store.
- Actions: Plain JavaScript objects that describe an event or a change that should occur in the application. Each action must have a type property.
- Reducer: Mini Stores/Portions. Functanility Part, helps to mutate state variables. Functions that determine how the state changes in response to actions. They take the current state and an action as arguments and to manipulate existing state. (state, action) => NewState
- useSelector: to access, Functions that allow you to extract specific pieces of information from the state.
- useDipatch: to send, This function is used to send actions to the store, triggering the reducer to update the state.
- configureStore(toolkit): A helper function to set up the store
- createSlice(toolkit): This function allows you to define your Redux slice in one go— reducers, actions, and initial state— all in one place. It simplifies reducer logic and auto-generates action creators.

Steps:-
- Create Store: "src" -> "app" -> "store.js"
- configureStore({})
- "src" -> "features" -> feature folder -> featureSlice.js
e.g. todoSlice.js-
- const initialState = { todos: [ { id: nanoid(), text: "Hello World" } ] }
- export const todoSlice = createSlice({
    name: 'todo', //name of slice, will show in Redux DevTools chrome extension
    initialState,
    reducers:   {   //includes properties & mostly method/functanilities
        addTodo: (state, action) => {               //will help understand to send (useDispatch)
            //always will get these two prams
            const todo = {
              //state- access of value in current state
              //action- access of value(s)/data e.g. id
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo); //direct manipulation unlike React by Redux toolkit, states are preserved here
        },
        removeTod: (state, action) => {             //will help understand to access (useSelector)
            state.todos.filter(todo => todo.id !== action.payload);
        }
        //this part is diff. from context api, in context API funtion was declared but not defined. Was then defined in Components
    }
})
- export const {addTodo, removeTodo} = todoSlice.actions; //action creaters are automatically generated (by Redux toolkit) for each reducer method. Here "addTodo" and "removeTodo" are action creators that can be used to modify the state, used in Components
- export default todoSlice.reducer; //This property is the actual reducer function generated by the slice, by this we will use individual reducers, used in Store
Go to store.js again-
import todoReducer from "../features/todo/todoSlice"; //imports todoSlice.reducer
- export const store = configureStore({reducer: todoReducer}) // Set the todoReducer as the root reducer for the store, can add multiple reducers too like this reducer: { todo: todoReducer, user: userReducer }
Now store is ready
Store and reducers config is DONE!, now moving to how to use:
- <Provider> component from "react-redux" makes the Redux Store available to any nexted/children components that need to access the Redux store. Usually we wrap it in top most component, i.e. main.jsx e.g.
<Provider store={store}>
  <App />
</Provider>
- useDispatch- to access reducers, uses reducers to change values in store or manipulate state. e.g. AddTodo.jsx
const [input, useInput] = useState("");
const dispatch = useDispatch();
function addTodoHandler(e) {
    dispatch(addTodo(input));
}
- useSelectors- allows to extract data or the state from Redux Store, takes callback as argument e.g. Todos.jsx
const todos = useSelector(state => state.todo.todos);
const dispatch = useDispatch();
function handleOnClick(id) {
    dispatch(removeTodo(id));
}

---------------------------------------------------------------------------------------------------------------------------------

Redux with JavaScript only:-
/redux-app  
 ├── index.js  // Entry point, sets up store & actions  
 ├── store.js  // Redux store setup  
 ├── counterReducer.js  // Reducer for counter  
 ├── userReducer.js  // Reducer for user  
 ├── todoReducer.js  // Reducer for todos  

Steps:-
Initial state
Reducer function
Store creation & subscription
Dispatching actions (increment, set user, add todo)

- npm install redux

- Create Store (store.js)
  const { createStore, combineReducers } = require("redux");
  const counterReducer = require("./counterReducer");
  const userReducer = require("./userReducer");
  const todoReducer = require("./todoReducer");

  const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    todos: todoReducer
  });

  const store = createStore(rootReducer);

  module.exports = store;

- Counter Reducer (counterReducer.js)
  const initialState = { count: 0 };

  function counterReducer(state = initialState, action) {
    switch (action.type) {
      case "INCREMENT":
        return { count: state.count + 1 };
      case "DECREMENT":
        return { count: state.count - 1 };
      default:
        return state;
    }
  }

  module.exports = counterReducer;

- User Reducer (userReducer.js)
  const initialState = { name: "", age: 0 };

  function userReducer(state = initialState, action) {
    switch (action.type) {
      case "SET_USER":
        return { name: action.payload.name, age: action.payload.age };
      default:
        return state;
    }
  }

  module.exports = userReducer;

- Todo Reducer (todoReducer.js)
  const initialState = { todos: [] };

  function todoReducer(state = initialState, action) {
    switch (action.type) {
      case "ADD_TODO":
        return { todos: [...state.todos, action.payload] };
      case "REMOVE_TODO":
        return { todos: state.todos.filter((_, i) => i !== action.payload) };
      default:
        return state;
    }
  }

  module.exports = todoReducer;

- Using Redux || Dispatch Actions (index.js)
  const store = require("./store");

  // Subscribe to state changes
  store.subscribe(() => console.log("Updated State:", store.getState()));

  // Dispatching actions to modify the Redux state
  store.dispatch({ type: "INCREMENT" });  // Increment counter  // Output: { counter: 1, user: {}, todos: [] }
  store.dispatch({ type: "INCREMENT" });  // Increment counter  // Output: { counter: 2, user: {}, todos: [] }
  store.dispatch({ type: "DECREMENT" });  // Decrement counter  // Output: { counter: 1, user: {}, todos: [] }

  store.dispatch({ 
    type: "SET_USER", 
    payload: { name: "Ritank", age: 25 }  // Set user details
  });
  // Output: { counter: 1, user: { name: "Ritank", age: 25 }, todos: [] }

  store.dispatch({ type: "ADD_TODO", payload: "Learn Redux" }); // Add todo //
  // Output: { counter: 1, user: { name: "Ritank", age: 25 }, todos: ["Learn Redux"] }
  store.dispatch({ type: "ADD_TODO", payload: "Build a project" });
  // Output: { counter: 1, user: { name: "Ritank", age: 25 }, todos: ["Learn Redux", "Build a project"] }
  store.dispatch({ type: "REMOVE_TODO", payload: 0 }); // Remove first todo
  // Output: { counter: 1, user: { name: "Ritank", age: 25 }, todos: ["Build a project"] }

  // Get final state
  console.log("Final State:", store.getState());
  // Final Output: { counter: 1, user: { name: "Ritank", age: 25 }, todos: ["Build a project"] }

---------------------------------------------------------------------------------------------------------------------------------

Redux Toolkit with only JavaScript:-
redux-toolkit-example/
│── store.js        # Redux Store & Slice
│── index.js        # Main File (Using Redux Store)

- store.js – Setting up Redux Toolkit Store
  const { configureStore, createSlice } = require("@reduxjs/toolkit");

  // Create a slice with reducers
  const appSlice = createSlice({
    name: "app",
    initialState: { counter: 0, user: {}, todos: [] },
    reducers: {
      increment: (state) => { state.counter += 1; },
      decrement: (state) => { state.counter -= 1; },
      setUser: (state, action) => { state.user = action.payload; },
      addTodo: (state, action) => { state.todos.push(action.payload); },
      removeTodo: (state, action) => { state.todos.splice(action.payload, 1); },
    },
  });

  // Export actions
  const { increment, decrement, setUser, addTodo, removeTodo } = appSlice.actions;

  // Create Redux store
  const store = configureStore({ reducer: appSlice.reducer });

  module.exports = { store, increment, decrement, setUser, addTodo, removeTodo };

- index.js – Using the Store in Main File
  const { store, increment, decrement, setUser, addTodo, removeTodo } = require("./store");

  // Subscribe to state updates
  store.subscribe(() => console.log("Updated State:", store.getState()));

  // Dispatch actions
  store.dispatch(increment());
  // Output: { counter: 1, user: {}, todos: [] }
  store.dispatch(increment());
  // Output: { counter: 2, user: {}, todos: [] }
  store.dispatch(decrement());
  // Output: { counter: 1, user: {}, todos: [] }

  store.dispatch(setUser({ name: "Ritank", age: 25 }));
  // Output: { counter: 1, user: { name: "Ritank", age: 25 }, todos: [] }

  store.dispatch(addTodo("Learn Redux Toolkit"));
  // Output: { counter: 1, user: { name: "Ritank", age: 25 }, todos: ["Learn Redux Toolkit"] }
  store.dispatch(addTodo("Build a project"));
  // Output: { counter: 1, user: { name: "Ritank", age: 25 }, todos: ["Learn Redux Toolkit", "Build a project"] }
  store.dispatch(removeTodo(0));
  // Output: { counter: 1, user: { name: "Ritank", age: 25 }, todos: ["Build a project"] }

  // Get final state
  console.log("Final State:", store.getState());
  // Final Output: { counter: 1, user: { name: "Ritank", age: 25 }, todos: ["Build a project"] }

Why Redux Toolkit?
Less Boilerplate – No need to write action creators separately.
Mutability with Immer – No need to use return { ...state }.
Simple & Scalable – Best for large applications.

---------------------------------------------------------------------------------------------------------------------------------

Deploy React Projects to Github Pages(live url):
- npm install --save-dev gh-pages                       //makes it's easy to deploy projects to GitHub Pages
- convite.config.js- defineConfig({
                        base: "/YOUR_REPOSITORY_NAME/", //case senstive, to specify the base path for your project
                      });
- package.json- "homepage": "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/",
                "scripts": {                            //Add homepage and deployment scripts
                  "predeploy": "npm run build",         // Builds your app before deploying
                  "deploy": "gh-pages -d dist",         // Deploys the contents of the 'dist' folder
                }
- commit and push these changes to github repo
- npm run deploy- //builds your project and publishes it to the gh-pages branch of your repository, and run this in future if there is any change in main code
- GitHub Pages URL- https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/

---------------------------------------------------------------------------------------------------------------------------------

Enviroment Variables:
These are key-value pairs used to store configuration settings and information that can be accessed by applications during runtime. They are typically used to define values that should be kept outside the source code, such as sensitive information or environment-specific settings, like API keys, database URLs, or runtime configurations.
Every enviroment can have different convention to store or access env variables so do visit respective tech doc (e.g. Create-React-App convention is different from VITE)
Do Not Commit .env Files: Add the .env file to .gitignore to avoid exposing sensitive information in version control.
UPPER CASE is naming convention for env variables.
.env  (this file should be in root folder)
    VITE_APPWRITE_URL = "test enviroment"  //better practice
    VITE_APPWRITE_URL = test enviroment    //both will work
to accsess- import.meta.env.VITE_APPWRITE_URL
- Create-React-App:   process.env.REACT_APP_*
- VITE: import.meta.env.VITE_*
- Other: process.evn.*
To use env var best practice is to create new folder then create a .js file and export all env var in an object
scr/config/config.js:-
const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL)
}
export default config;

---------------------------------------------------------------------------------------------------------------------------------

Vendor lock-in: It is a scenario where a customer becomes dependent on a vendor for products and services because they are unable to use another vendor without substantial switching costs. It causes reduced flexibility and freedom for the customer. e.g. in software devlopment project is made in a way that it is fully dependent on one database, and will require lots of change in code and money to shift to another one. Hence, this should be prevented/avoided at first. Hence we use services, its nothing but classes which is used to manipulate data from one place and that place can be changed anytime in future, so main code will not be entirly affected by it.

---------------------------------------------------------------------------------------------------------------------------------

Regex (Regular Expressions) - A sequence of characters that define/validate a search pattern, used for string matching and manipulation. (can be generated from gpt) e.g.
// Regular expression for validating email format
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
regex.test(email);  -> true or false

---------------------------------------------------------------------------------------------------------------------------------

forwardRef: It is a utility in React that allows you to pass a ref (reference) from a parent component to a child component, giving the parent component direct access to the child component's DOM or instance. e.g.
Parent- function App() {
  let inputRef=React.useRef(null);
  return (
    <>
      <Input ref={inputRef} />
      <button onClick={() => {inputRef.current.value = 1000}}> Update Input </button>
    </>
  )
}
Child- function Input(props, ref) { //in second parameter
  return <input ref={ref}>
}
export default React.forwardRef(Input);
Use useRef or forwardRef as low as possible, because it violates React's (state) law i.e. do not manipulate DOM directly, but use states.

---------------------------------------------------------------------------------------------------------------------------------

React Hook Form: It is a popular library in React that simplifies the process of managing forms, including their validation, submission, and handling of form state with key features including Minimal Re-renders, Integration with UI Libraries, Better Performance, Flexible and Scalable.
- npm install react-hook-form,  e.g.
  import const { handleSubmit, register, control,  formState: {errors, isSubmitting}, watch, setValue, getValues } = useForm({
    defaultValues: {
      name: "name"
    }
  });

  // Contionusly watch the value of 'name' as the user types
  const watchedName = watch("name");

  // Example: Automatically set the value of 'name' after 2 seconds
  useEffect(()=> {
    const timer = setTimeout(() => {
      setValue("name", "Enter Your Name"); // Programmatically setting the 'name' value
      console.log("Set Name Programmatically to 'Enter Your Name'");
    }, 2000)
    return () => clearTimeout(timer);
  }, [setValue]);

  // Example: Get values programmatically when needed
  const handleGetValues  = () => {
    const formValues = getValues();
    console.log("Current form values", formValues);
  }

  return (
    <div>
      <form onSubmit={handleSubmit((data) => {console.log("Submitted data",data)})}>
        {/* Input field using register */}
        <input 
          type="text"
          placeholder='enter your name'
          {...register("name", {
            required: "Name is required", 
            maxLength: { value: 20, message: "Max length is 20" },
            minLength: { value: 4, message: "Min length is 4" },
            validate: {
              matchPattern: (value) => /^[A-Z][a-zA-Z' -]+(?: [A-Z][a-zA-Z' -]+)*$/.test(value) || "Name is not valid"
            }
          })}  
        />
        {errors.name && <p>{errors.name.message}</p>}
        <br /><br />
        {/* Display watched name */}
        <p>Watched Name: {watchedName}{console.log("Watched Name: ",watchedName)}</p>
        {/* Input field using Controller with validation */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "email is required",
          }}
          render={({field: {onChange, value = "123"}}) => 
            <>
              <input
                // {...field}
                placeholder='enter your email'
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  console.log("Email Changed: ", e.target.value);
                }}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </>
          }
        />
        <br /><br />
        <input type="submit" disabled={isSubmitting} value={isSubmitting ? "Submitting" : "Submit"} />
        <br /><br />
        <button type='button' onClick={handleGetValues}>Get Form Value</button>
      </form>
    </div>
  )
- defaultValues: is used to set initial values for the form fields
- register: is used to connect input fields to react-hook-form
- handleSubmit: is used to manage form submission
- control: control is used with Controller to manage controlled components or custom input elements that don’t integrate easily with register
- watch
- setValue
- getValue
- formState: contains metadata about the form such as the validation errors (errors) and the submission status (isSubmitting)
  - errors
  - isSubmitting
- Controller: is used for custom components or controlled inputs where you can't use register directly  (e.g., for libraries like Material UI, React Select, or custom inputs).
  - render
    - field
      - onChange
      - value

---------------------------------------------------------------------------------------------------------------------------------

CORS- Cross Origin Resource Sharing
It is a mechanism that allows website on one URL to request data from different URL

---------------------------------------------------------------------------------------------------------------------------------

useReducer:-
It is a React hook used to manage more complex state logic. It is similar to useState but is useful when the state depends on previous states or requires multiple state transitions.
e.g.
// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
};
const Counter = () => {
  const initialState = { count: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);  //syntax
  return (
    <div>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
};
export default Counter;

---------------------------------------------------------------------------------------------------------------------------------

import/export || module.exports/require   -> old (sync) : before ES6 (still works in any js file, but outdated)
(runs with both browser & npm/node)
File- a.js
module.exports= x;    //default export
exports.key= x;    //named export
File- b.js
x = require('./a.js);
{key} = require('./a.js);

To use this add: "type": "module" in package.json     -> new (async) :ES6 (runs only with npm/node)
and to use in brouser add- type="module" in script tag in HTML
File- a.js
export default x; //default export
or export {y} //named export
File- b.js
import x, {y} from "./a.js"
import * as hello from "./c.js";    //all import as one, less use in industry (named export)

both runs full code from import/require file(s)

Difference- 

import/export:
Used in ES6 modules (JavaScript's standard module system). [Async] (all import will run parallelly)
Syntax: import ... from 'module'; and export ....
Static and cannot be conditionally imported; imports are resolved at compile-time.
Primarily used in modern browsers and tools like bundlers (Webpack, Babel).

require/module.exports:
Used in CommonJS modules (Node.js's module system). [Sync] (executes one by one)
Syntax: const ... = require('module'); and module.exports = ....
Can be conditionally required; modules are loaded at runtime.
Mostly used in Node.js (though it supports both systems since v12+).


Re-export the default export from another module with a new name. Useful for centralized exports (like index.js in a folder). Prevents multiple imports from different files by grouping exports. e.g.
- math.js
  export default function add(a, b) {
    return a + b;
  }
- index.js
export { default as sum } from "./math";
- main.js //any module importing from index.js can use sum instead of add
  import { sum } from "./index";
  console.log(sum(2, 3)); // Output: 5


Async & Conditional (dynamic) Imports:-
dynamic imports allow loading modules asynchronously and conditionally using import(). Useful for on-demand loading (e.g., performance optimization). It reduces initial load time. Handle code-splitting in Node.js.
e.g.
async function loadModule() {
  const module = await import('./math.js'); // Dynamically import
  console.log(module.add(2, 3)); // Use exported function
}
loadModule();
async function loadLogger(isDebug) {
  if (isDebug) {
    const { debugLog } = await import('./logger.js');
    debugLog("Debug mode is ON");
  }
}
loadLogger(true);


---------------------------------------------------------------------------------------------------------------------------------

Bundler - A bundler is a tool that combines and optimizes JavaScript, CSS, and assets into a single (or multiple) files for efficient loading in a web app.

Parcel and Webpack enable JavaScript code to run in the browser by bundling and processing modules, allowing developers to use Node.js-based packages and features in client-side applications(browser). They manage dependencies, compile assets, and optimize code for better performance in the browser.

Parcel- Parcel is a zero-configuration web application bundler that offers fast builds and automatic dependency management, making it ideal for quick setups and prototyping.

Webpack- Webpack is a powerful and flexible module bundler that enables developers to customize their build process extensively, suitable for large-scale applications with complex configurations. React also uses webpack.

Vite- Vite is a modern build tool designed for fast and efficient development. It uses ES Modules in the browser for development, providing instant server startup and lightning-fast hot module replacement (HMR). For production, Vite leverages Rollup for bundling, offering optimized and performant builds. Its zero-configuration setup and support for modern JavaScript and frameworks like React, Vue, and Svelte make it ideal for both small and large-scale applications.

Babel- Babel is a JavaScript compiler that converts modern JavaScript (ES6+) into backward-compatible code for older browsers and environments.
- Transpilation – Converts ES6+ (e.g., let, const, arrow functions) to ES5.
- Polyfills – Adds missing features for old browsers.
- Plugins & Presets – Customize transformations (e.g., JSX to JS).
- Works with Webpack, Parcel, etc.

---------------------------------------------------------------------------------------------------------------------------------

//nvm-windows- https://github.com/coreybutler/nvm-windows/releases
//A Node Version Manager for Windows that allows you to easily install, manage, and switch between different versions of Node.js. It simplifies the process of working with multiple Node.js versions on a Windows system.
//npm install --save-dev parcel
//  "scripts": {
//     "start": "parcel",
//     "build": "parcel build"
//   }
//OR- npm install --save-dev parcel
//nvm i (version-number)
//nvm use (version-number)

---------------------------------------------------------------------------------------------------------------------------------

axios basic syntax:-
GET-
axios.get(url, { params: { key: value } })
  .then(response => {
    console.log(response.data); // Handle the response
  })
  .catch(error => {
    console.error(error); // Handle the error
  });
POST-
axios.post(url, { key: value }, { headers: { "Content-Type": "application/json" } })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
CUSTOM-
axios({
  method: 'get', // or 'post', 'put', 'delete', etc.
  url: 'https://api.example.com/data',
  data: {
    key1: 'value1', // Body data
    key2: 'value2',
  },
  headers: {
    'Authorization': 'Bearer your_token',
  },
  timeout: 5000, // 5 seconds timeout
})
  .then(response => console.log(response.data))
  .catch(error => console.error(error))

---------------------------------------------------------------------------------------------------------------------------------

Summary Table – What Triggers a Re-render?
🔥Cause	 🚀Triggers-Re-Render?
setState	✅ Yes
useReducer	✅ Yes
props change	✅ Yes
Context value update (useContext)	✅ Yes
Parent re-renders	✅ Yes
useSelector (Redux store change)	✅ Yes
dispatch() (Redux action)	✅ Yes
useRef.current update	❌ No
Changing function reference (useCallback)	✅ Yes (for child)
Changing memoized value (useMemo)	✅ Yes
useEffect updating state	✅ Yes

Best Practices to Prevent Unnecessary Re-renders
Use React.memo() to prevent re-rendering of child components when props don’t change.
Use useCallback() to memoize function references.
Use useMemo() to avoid expensive recalculations.
Use Redux state selectors efficiently (useSelector) to minimize unnecessary re-renders.
Use useEffect carefully to avoid infinite re-render loops.

---------------------------------------------------------------------------------------------------------------------------------

Redux Toolkit example, where we manually dispatch actions for loading, success, and failure when fetching an API

/redux
  ├── store.js
  ├── postSlice.js
/components
  ├── PostList.js
/App.js
/index.js

- Create Redux Store (store.js)
  import { configureStore } from "@reduxjs/toolkit";
  import postReducer from "./postSlice";

  export const store = configureStore({
    reducer: {
      posts: postReducer,
    },
  });

- Create a Slice (postSlice.js)
  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    loading: false,
    data: [],
    error: null,
  };

  const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
      postStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      postSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
      },
      postFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });

  export const { postStart, postSuccess, postFailure } = postSlice.actions;
  export default postSlice.reducer;

- Create a Component (PostList.js)
  import React, { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import axios from "axios";
  import { postStart, postSuccess, postFailure } from "../redux/postSlice";

  const PostList = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.posts);

    useEffect(() => {
      const fetchPosts = async () => {
        dispatch(postStart());
        try {
          const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
          dispatch(postSuccess(response.data));
        } catch (err) {
          dispatch(postFailure(err.message));
        }
      };

      fetchPosts();
    }, [dispatch]);

    if (loading) return <h3>Loading...</h3>;
    if (error) return <h3>Error: {error}</h3>;

    return (
      <div>
        <h2>Posts</h2>
        <ul>
          {data.slice(0, 5).map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  };

  export default PostList;

Problem with the Current Approach (Without Thunk):-
In our current setup, we are making the API call inside the React component (PostList.js) and manually dispatching actions (postStart, postSuccess, postFailure).
While this works, it violates separation of concerns because:
- Business logic (API call) is inside the UI component, making it harder to reuse.
- Code duplication occurs if multiple components fetch the same API.
- Lack of centralized error handling—each component must handle failures separately.
- Not scalable—managing multiple API calls this way becomes messy.

---------------------------------------------------------------------------------------------------------------------------------

Redux Thunk-

Redux Thunk is a middleware that allows us to write async logic (like API calls) inside action creators before dispatching actions.
Instead of returning an action object, Thunk allows us to return a function that can perform async operations and dispatch actions later.

Why Use Redux Thunk?
Redux Thunk allows us to move API calls out of components and handle them in a dedicated Redux function (middleware). This provides:
- Separation of concerns → Components only dispatch an action; Redux handles the API call.
- Centralized API logic → Reuse logic across components.
- Cleaner components → Components focus only on UI and state updates.
- Better error handling → Handle errors in one place.

Steps to Use Redux Thunk for API Calls:
- Move the API call from the React component to Redux.
- Use redux-thunk middleware to handle async logic.
- Dispatch actions (postStart, postSuccess, postFailure) inside the async function.

redux-thunk-example/
│── src/
│   ├── components/
│   │   ├── PostList.js  # React component to display posts
│   ├── redux/
│   │   ├── store.js     # Redux store setup
│   │   ├── postSlice.js # Redux slice with Thunk for API call
│   ├── App.js          # Main App component
│   ├── index.js        # Entry point

- Create postSlice.js (Redux slice with Thunk)
  ```js
  import { createSlice } from "@reduxjs/toolkit";

  // Initial state
  const initialState = {
    loading: false,
    data: [],
    error: null,
  };

  // Create Redux slice
  const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
      postStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      postSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
      },
      postFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });

  // Export actions
  export const { postStart, postSuccess, postFailure } = postSlice.actions;
  export default postSlice.reducer;

  // Thunk function to fetch posts
  export const fetchPosts = () => async (dispatch) => {
    dispatch(postStart()); // Start loading

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      dispatch(postSuccess(data)); // Dispatch success action
    } catch (error) {
      dispatch(postFailure(error.message)); // Dispatch failure action
    }
  };
  ```

- Create store.js (Redux Store)
  ```js
  import { configureStore } from "@reduxjs/toolkit";
  import postReducer from "./postSlice";
  import thunk from "redux-thunk"; // Import thunk middleware

  const store = configureStore({
    reducer: {
      posts: postReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    //middleware controls extra logic (e.g., async actions with redux-thunk)
  });

  export default store;
  ```

- Use Redux in index.js
  ```js
  import React from "react";
  import ReactDOM from "react-dom/client";
  import { Provider } from "react-redux";
  import store from "./redux/store";
  import App from "./App";

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  ```

- Fetch and Display Data in PostList.js
  ```js
  import React, { useEffect } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import { fetchPosts } from "../redux/postSlice";

  const PostList = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.posts);

    useEffect(() => {
      dispatch(fetchPosts()); // Dispatch thunk to fetch posts
    }, [dispatch]);

    return (
      <div>
        <h2>Posts</h2>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        <ul>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  };

  export default PostList;
  ```

---------------------------------------------------------------------------------------------------------------------------------

Difference: reducers vs extraReducers in Redux Toolkit

Using reducers (Manual Reducers)
- You manually define action types (postStart, postSuccess, postFailure).
- Actions are dispatched inside a thunk function.
- More control, but requires extra boilerplate.
x Problem: We need to manually dispatch these actions inside our thunk.

Using extraReducers (createAsyncThunk)
- createAsyncThunk automatically generates pending, fulfilled, and rejected action types.
- No need to manually define postStart, postSuccess, postFailure.
- Reduces boilerplate and improves readability. Cleaner and recommended for async operations in Redux Toolkit

---------------------------------------------------------------------------------------------------------------------------------

Example using createAsyncThunk and extraReducers in Redux Toolkit for fetching an API
Why Use createAsyncThunk and extraReducers?
- createAsyncThunk automates async logic (API requests, success/failure handling).
- extraReducers handles pending, fulfilled, and rejected states without manual reducers.

/src
 ├── /store
 │    ├── postSlice.js  (Redux logic)
 │    ├── store.js  (Redux store)
 ├── App.js  (React component)
 ├── index.js  (Entry point)

- (Redux Logic - Fetch Posts API)
  ```js
  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

  // 🟢 Fetch posts API using createAsyncThunk
  export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
  });

  // 🟢 Initial state
  const initialState = {
    loading: false,
    data: [],
    error: null,
  };

  // 🟢 Create slice
  const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {}, // No manual reducers here, all handled in extraReducers

    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

  export default postSlice.reducer;
  ```

- store.js (Redux Store Configuration)
  ```js
  import { configureStore } from "@reduxjs/toolkit";
  import postReducer from "./postSlice";

  const store = configureStore({
    reducer: {
      posts: postReducer,
    },
  });

  export default store;
  ```

- App.js (React Component - Dispatch & Display)
  ```js
  import React, { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchPosts } from "./store/postSlice";

  const App = () => {
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector((state) => state.posts);

    // Fetch posts when component mounts
    useEffect(() => {
      dispatch(fetchPosts());
    }, [dispatch]);

    return (
      <div>
        <h1>Posts</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <ul>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  };

  export default App;
  ```

✅ createAsyncThunk automates API calls with pending, fulfilled, and rejected actions.
✅ extraReducers handles state changes instead of writing separate reducers.
✅ Redux Toolkit simplifies Redux logic, making code cleaner and more maintainable.

---------------------------------------------------------------------------------------------------------------------------------

Custom React App:-

- npm i webpack webpack-cli webpack-dev-server html-webpack-plugin -D
webpack – Bundles your JavaScript files and assets
webpack-cli – Allows you to run Webpack commands from the terminal
webpack-dev-server – Provides a local development server with live reloading
html-webpack-plugin – Generates an index.html file and injects your bundled scripts automatically
All these are dev dependencies

- npm i react react-dom
For all react functionality

- npm i @babel/core @babel/preset-env @babel/preset-react babel-loader -D
@babel/core → The main Babel compiler
@babel/preset-env → Converts modern JavaScript (ES6+) to browser-compatible JS
@babel/preset-react → Transforms JSX into JavaScript
babel-loader → Integrates Babel with Webpack

- npm install --save-dev style-loader css-loader



/Custom-React-App
 ├── /public
 │    ├── index.html
 ├── /src
 │    ├── index.js
 │    ├── style.css
 ├── package.json
 ├── webpack.config.js
 ├── .babelrc

- package.json
```js
"scripts": {
    "start": "webpack serve --config webpack.config.js",  // Starts the dev server using webpack.config.js
    "build": "webpack --config webpack.config.js"         // Builds the production-ready files
}
```

- webpack.config.js
```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //1. Entry Point
  entry: "./src/index.js", // Entry point of your app

  //2. Output Settings
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // Cleans old files in the dist folder
  },

  //3. Development or Production
  mode: "development", // Change to "production" for optimized build

  //4. Development Server
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000, // Runs on localhost:3000
    hot: true, // Enables Hot Module Replacement
    open: true, // Opens browser automatically
  },

  //5. Module Processing
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Support both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // Handles CSS files
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // Handles image files
        type: "asset/resource",
      },
    ],
  },

  //6. Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Uses custom HTML template
      filename: "index.html",
    }),
  ],

  //7. Resolve
  resolve: {
    extensions: [".js", ".jsx", "css"], // Allows importing files without specifying extensions
  },
};
```

- .babelrc
```js
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

---------------------------------------------------------------------------------------------------------------------------------

Micro Frontend:-
Micro frontend is an architectural approach where a large frontend application is broken into smaller, independent applications that work together. Think of it like microservices but for frontend.
Why?
- Allows different teams to work on different parts of the app independently.
- Improves scalability and maintainability.
- Enables technology diversity (one team can use React, another Angular, etc.).

Module Federation:-
Module Federation is a feature introduced in Webpack 5 that allows JavaScript applications to share code and dynamically import modules from other applications at runtime.
It is the key enabler for Micro Frontend, as it lets different frontend apps load and use components from each other without bundling everything together.
How Does it Work?
- Each app (or micro frontend) is configured as a remote module or a host.
- Apps can dynamically import components from other apps at runtime (instead of at build time).
- This allows multiple teams to deploy independently while still sharing code efficiently.

Render Component Remotely:-
(Same as above folder struture)

Remote App:-
- webpact.config.js
  ```js
  const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
  plugins: [
    new ModuleFederationPlugin({
      name: "remoteApp",  // Name of the remote application  
      filename: "remoteEntry.js", // Filename for the remote entry point, which will be used to expose modules
      // Modules that this remote application will expose to other applications
      exposes: {
        "./CounterApp": "./src/Components/Counter",
        "./TodoApp": "./src/Components/Todo"
      },
      // shared: ["react", "react-dom"],  //rhis has isssues, less control
      // Shared dependencies to avoid multiple versions of the same library being loaded
      shared: {
        react: {
          singleton: true,  // Ensures only one instance of react is used across applications
          requiredVersion: false, // Allows different versions without strict matching
          eager: true // Loads this module at build time instead of runtime, reducing load time but increasing bundle size
        },
        "react-dom": {
          singleton: true,
          requiredVersion: false,
          eager: true
        }
      }
    })
  ]
  ```

Host/Fetch App:-
- webpact.config.js
  ```js
  plugins: [
    new ModuleFederationPlugin({
      name: "hostApp",  // Name of the host application that will consume remote modules
      // Remote applications that this host will consume
      remotes: {
        // Defining "remoteApp" and specifying its entry point
        // "remoteApp" is the name used to reference this remote application
        "remoteApp": "remoteApp@http://localhost:3001/remoteEntry.js"
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: false,
          eager: true
        },
        "react-dom": {
          singleton: true,
          requiredVersion: false,
          eager: true
        }
      }
    })
  ]
  ```
- index.js
```js
const App = () => {
    const [ReceivedCounter, setReceivedCounter] = useState(null);
    const [ReceivedTodo, setReceivedTodo] = useState(null);

    useEffect(() => {
        import("remoteApp/CounterApp").then((module) => {
            setReceivedCounter(() => module.default);   //default
            // Ensure it's a React component
        });
    }, []); // ✅ Added dependency array to run only once

    useEffect(() => {
        import("remoteApp/TodoApp").then((module) => {
            setReceivedTodo(() => module.Todo); //named
        });
    }, []);

    return (
        <div>
            <h1>Host App or Fetch App</h1>
            {ReceivedCounter ? <ReceivedCounter /> : <p>Loading remote component...</p>}
            {ReceivedTodo ? <ReceivedTodo /> : <p>Loading remote component...</p>}
        </div>
    );
};
```

---------------------------------------------------------------------------------------------------------------------------------

- npm list react react-dom   -> to check current version

---------------------------------------------------------------------------------------------------------------------------------

dangerouslySetInnerHTML in React
Used to render raw HTML inside a React component.
⚠️ Dangerous because it can expose your app to XSS attacks if user input is not sanitized.
```js
const htmlContent = { __html: "<h2>Hello, <i>World!</i></h2>" };
function MyComponent() {
    return <div dangerouslySetInnerHTML={htmlContent} />;
}
```
When to Use?
✅ When rendering trusted HTML (e.g., from a CMS).
❌ Avoid using it with user-generated content without proper sanitization.