import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const apiUrl = "http://localhost:5000/bfhl"; // Replace with your deployed Flask backend URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post(apiUrl, parsedJson);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON or API error.');
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  const filteredResponse = () => {
    if (!response) return {};
    const filtered = {};
    if (selectedOptions.includes('Numbers')) {
      filtered.numbers = response.numbers;
    }
    if (selectedOptions.includes('Alphabets')) {
      filtered.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Highest Lowercase Alphabet')) {
      filtered.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }
    return filtered;
  };

  return (
    <div className="App">
      <h1>{/* Set your roll number as the title here */}RA2111003030071</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter JSON:</label>
        <textarea
          rows="5"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"data": ["A", "1", "z"]}'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h3>Response:</h3>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleOptionChange}
            /> Alphas
          </label>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleOptionChange}
            /> Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest Lowercase Alphabet"
              onChange={handleOptionChange}
            /> Highest Lowercase Alphabet
          </label>
          <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
