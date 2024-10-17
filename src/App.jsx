import { useState } from 'react'
import './App.css'

const SignatureLogo = () => {
  // Construct logo signature
  return (
    <div>
      <img src="logo.svg" className="logo" />
    </div>
  );
};

const SortAlphabeticallyButton = ({ handleClick, visible }) => {
  // Sort button
  return (
    <button
      className={visible ? "sort-button" : "sort-button-invisible"}
      onClick={() => handleClick()}
    >Sort Numbers Alphabetically</button>
  )
}

const TextInputContainer = ({ handleSubmit }) => {
  // Construct variables and functions we will need
  const [text, setText] = useState("");

  // Change text based on input
  const handleInput = (e) => {
    setText(() => {
      return e.target.value;
    });
  }

  // Handle click function
  const handleClick = () => {
    handleSubmit(text);
  }

  // return text input and submit button
  return (
    <div className="text-input-container">
      <textarea
        className="text-field"
        type="text"
        placeholder="- type comma separated integers here -"
        onInput={(e) => {handleInput(e)}}
        value={text}
      />
      <SortAlphabeticallyButton handleClick={ handleClick } visible={text.length > 0}/>
    </div>
  )
}

const ErrorMessage = ({ visible }) => {
  // Provide error message with adjusting opacity based on visibility
  return (
    <div className={ visible ? "error-notification" : "error-notification-invisible" }>
      <b>error</b>
    </div>
  );
};

const Explanation = ({ visible }) => {
  // Provide explanation with adjusting opacity based on visibility
  return (
    <div className={ visible ? "explanation" : "explanation-invisible" }>
      Valid inputs can only include numbers, commas, and spaces.<br/>
      For example:<br/>
      <b>1, 23, 456, 7890</b>
    </div>
  );
};

const OverNineThousand = ({ str }) => {
  // Construct special result for results that are 'over nine-thousand'
  return (
    <div className="result">
      <img src="its-over-9000.gif" alt="It's Over 9000!" className="its-over-nine-thousand" title={str}/>
    </div>
  )
}

const Result = ({ str }) => {
  // Construct Result
  return (
    str.includes("over nine-thousand") ? (
      <OverNineThousand str={str}/>
    ) : (
      <div className="result">{str}</div>
    )
  );
}

const ResultsContainer = ( { strings } ) => {
  // Construct container for results
  return <div className="results-container">
    {
      strings.map((str, index) => (
        <Result str={str} key={index}/>
      ))
    }
  </div>
}

// Main application - Alphabetical Sorting Screen
const AlphabeticalSortingScreen = () => {
  // Strings generated from inputed comma seperated numbers...
  const [strings, setStrings] = useState([]);
  // Whether error is present or not...
  const [error, setError] = useState(false);

  // Handle submit function
  const handleSubmit = (text) => {
    if(isValidString(text)) {
      setError(false);

      convertUserInput(text).then(result => {
        setStrings(result);
      });
    } else {
      setError(true);
    }
  }

  // Return App
  return (
    <>
      <SignatureLogo/>
      <div className="interaction-container">
        <h1>Numbers To Text Sorting Algorithm</h1>
        <TextInputContainer handleSubmit={ handleSubmit }/>
        <ErrorMessage visible={ error }/>
        <Explanation visible={error}/>
      </div>
      <ResultsContainer strings={strings}/>
    </>
  )
}

export default AlphabeticalSortingScreen

// Check to see if string is valid
function isValidString(str) {
  return /^-?[\d,\s-]+$/.test(str);
}

// Function for obtaining the words through an API request
function convertUserInput(text) {
  // Set up options for the fetch request
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: text
    })
  };

  return fetch("https://v132i7ia88.execute-api.us-east-1.amazonaws.com/production/numbers-to-text-sorting-algorithm",
    options)
    .then(response => {
      if(!response.ok) {
        throw new Error("Network response was not okay")
      } else {
        return response.json();
      }
    }).then(result => {
      return result.words;
    })
}