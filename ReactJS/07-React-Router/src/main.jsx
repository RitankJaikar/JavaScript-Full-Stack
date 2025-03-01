import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Root from './Root.jsx'
// import Home from './components/Home/Home.jsx'
// import About from './components/About/About.jsx'
// import Contact from './components/Contact/Contact.jsx'
// import User from './components/User/User.jsx'
// import GitHub from './components/Github/Github.jsx'

import { githubInfoLoader } from './components/Github/Github.jsx'
import {Home, About, Contact, User, GitHub, NotFound, SearchParamsExample} from './components'
import {Person1, Person2, Person1Info, Person2Info} from './components'

//First way
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     children: [
//       {
//         path: '',
//         element: <Home />
//       },
//       {
//         path: "about",
//         element: <About />
//       },
//       {
//         path: "contact",
//         element: <Contact />
//       },
//     ]
//   }
// ])


//Second way (best)
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      {/* <Route path='contact' element={<Contact />} /> */}
      {/* New */}
      <Route path='contact' element={<Contact />} >
        <Route path='person1' element={<Person1 />} >
          <Route path='person1info' element={<Person1Info />} />
        </Route>
      </Route>
      <Route path='contact/person2' element={<Person2 />} >  /* More Specific */
        <Route path='person2info' element={<Person2Info />} />
      </Route>
      <Route path='user/:userid' element={<User />} />
      <Route
        loader = {githubInfoLoader}
        path='github'
        element={<GitHub />}
      />
      <Route path="*" element={<NotFound />} />
      <Route path='searchparamsexample' element={<SearchParamsExample  />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <RouterProvider router={router}/>
  //</React.StrictMode>
)


//Third way
// import { BrowserRouter, Routes } from 'react-router-dom'

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <Routes>
//       <Route path='/' element={<Root />}>
//         <Route path='' element={<Home />} />
//         <Route path='about' element={<About />} />
//         <Route path='contact' element={<Contact />} />
//         <Route path='user/:userid' element={<User />} />
//         <Route
//           // loader = {githubInfoLoader}  //does not support loader
//           path='github'
//           element={<GitHub />}
//         />
//       </Route>
//     </Routes>
//   </BrowserRouter>
// )