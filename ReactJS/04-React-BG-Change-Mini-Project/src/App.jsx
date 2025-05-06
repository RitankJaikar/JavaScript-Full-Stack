import { useState } from 'react';
import Button from './Button';

function App() {
  const [color, setColor] = useState("black");
  const colors = ["red", "green", "blue", "olive", "grey", "yellow", "pink", "purple", "lavender", "white", "black"];
  
  return (
    <div className="main h-[100vh] w-[100%] relative" style={{backgroundColor: color}}>
      <div className="flex absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg text-lg p-2 shadow-lg shadow-blue-500/50">
      {
        colors.map(color => {
          return <Button key={color} color={color} setColor={setColor}/>
        })
      }
      </div>
    </div>
  )
}

export default App