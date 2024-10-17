import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import logo from '/logo.svg'
import './App.css'

const SortAlphabeticallyButton = ({ handleClick, visible }) => {
  return (
    <button
      className={visible ? "sort-button" : "sort-button-invisible"}
      onClick={() => handleClick()}
    >Sort Numbers</button>
  )
}

const TextInputContainer = ({ handleSubmit }) => {
  // Construct variables we will need
  const [text, setText] = useState("");

  // Change text based on input
  const handleInput = (e) => {
    setText(() => {
      return e.target.value;
    });
  }

  const handleClick = () => {
    handleSubmit(text);
  }

  return (
    <div className="text-input-container">
      <textarea
        className="text-field"
        type="text"
        placeholder="Provide integers here ..."
        onInput={(e) => {handleInput(e)}}
        // onKeyDown={(e) => {handleKey(e)}}
        value={text}
      />
      <SortAlphabeticallyButton handleClick={ handleClick } visible={text.length > 0}/>
    </div>
  )
}

const AlphabeticalSortingScreen = () => {
  const handleSubmit = (e) => {
    console.log("e: ", e)
    if(isValidString(e)) {
      console.log("is valid...")
    } else {
      console.log("is not valid...")
    }
  }

  return (
    <>
      <div className="container">
        <h1>Numbers To Text Sorting Algorithm</h1>
        <TextInputContainer handleSubmit={ handleSubmit }/>        
      </div>
    </>
  )
}

function OldApp() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={logo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

  // useEffect(() => {
  //   if(text.length > 0) {

  //   }
  // }, [text])
  
  // const handleKey = ( e ) => {
  //   console.log("E: ", e)

  //   const {key, shiftKey} = e;

  //   if(key == "Enter" && shiftKey == false) {
  //     handleSubmit(text);
  //     setText("");
  //   }
  //   else if(key == "Enter" && shiftKey == true) {
  //     setText((prevText) => {
  //       return prevText + "\n"
  //     });
  //   } else {
  //     setText(() => {
  //       return e.target.value
  //     })
  //   }
  // };

export default AlphabeticalSortingScreen

function isValidString(str) {
  return /^[\d,\s]+$/.test(str);
}