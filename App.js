// App.js (Frontend)
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleJsonSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post('https://bajaj-backend-lemon.vercel.app/bfhl', { data: parsedData.data });
      setResponseData(res.data);
      setDropdownVisible(true);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Invalid JSON input or API error');
      setDropdownVisible(false);
      setResponseData(null);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;
    const { alphabets, numbers, highest_lowercase_alphabet } = responseData;
    let result = [];

    if (selectedOptions.includes('Alphabets')) result.push(`Alphabets: ${alphabets.join(', ')}`);
    if (selectedOptions.includes('Numbers')) result.push(`Numbers: ${numbers.join(', ')}`);
    if (selectedOptions.includes('Highest Lowercase Alphabet')) result.push(`Highest Lowercase Alphabet: ${highest_lowercase_alphabet.join(', ')}`);

    return result.map((item, index) => <p key={index}>{item}</p>);
  };

  return (
    <div>
      <h1>JSON Input Processor</h1>
      <textarea
        placeholder='Enter JSON here'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleJsonSubmit}>Submit</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {dropdownVisible && (
        <>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest Lowercase Alphabet"
              onChange={handleOptionChange}
            />
            Highest Lowercase Alphabet
          </label>
        </>
      )}

      <div>{renderResponse()}</div>
    </div>
  );
}

export default App;
