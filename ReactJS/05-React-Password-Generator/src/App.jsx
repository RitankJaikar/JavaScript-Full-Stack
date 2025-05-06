import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("password");

  //this project can be reated by only useState and useEffect, but for optimization using callback
  const passGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAllow)  str+="0987654321";
    if(charAllow) str+="~!@#$%^&*()_+`-={}[]:;<>?,./";
    for (let i = 0; i < length; i++) {
      let randomCharIndex = Math.floor(Math.random()*str.length);
      pass += str[randomCharIndex];
    }
    setPassword(pass);

  }, [length, numAllow, charAllow, setPassword]);  //to optimize, whenever change in any it is recreated

  useEffect(() => {
    passGen();
  }, [length, numAllow, charAllow, passGen]);  //whenever change in any it runs

  const passwordRef = useRef(null);

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className='bg-[#242424] p-4 rounded-xl text-xl w-[40rem]'>
      <h2 className='mb-4 text-4xl'>Password Generator</h2>
      <div className='rounded-xl mb-4'>
        <input className='p-2 h-12 w-[80%] rounded-s-xl' type="text" placeholder='password' readOnly value={password} ref={passwordRef}/>
        <button className='p-2 h-12 rounded-none w-[20%] rounded-e-xl' onClick={copyPass}>Copy</button>
      </div>
      <div>
        <input id='length' type="range" min="1" max="50" value={length} onChange={(event) => setLength(event.target.value)}/>
        &nbsp;
        <label htmlFor="length">Length ({length})</label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input type="checkbox" id='numbers' checked={numAllow} onChange={(event) => setNumAllow(!numAllow)}/>
        &nbsp;
        <label htmlFor="numbers">Numbers</label>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input type="checkbox" id='characters' checked={charAllow} onChange={(event) => setCharAllow(event.target.checked)}/>
        &nbsp;
        <label htmlFor="characters">Characters</label>
      </div>
      <br />
      <button onClick={passGen}>New Password</button>
    </div>
  )
}

export default App