import React, { useState } from "react";
import axios from 'axios';

function Gpt3Form() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const serverResponse = await axios.post('http://localhost:3001/api/ask', { text });
    setResponse(serverResponse.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Ask GPT-3:
          <input type="text" value={text} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      {response && (
        <div>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Gpt3Form;
