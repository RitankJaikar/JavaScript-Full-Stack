import React from "react"

// const reactElement = {
//   type: "a",
//   props: {
//       href: "https://google.com",
//       target: "_blank"
//   },
//   children: "Visit Google"
// }

const reactElement = React.createElement(
  "a",
  {href: "https://google.com", target: "_blank"},
  "Visit Google"
)

function App() {
  return (
    <>
      Hello World
      <br />
      {reactElement}
    </>
  )
}

export default App