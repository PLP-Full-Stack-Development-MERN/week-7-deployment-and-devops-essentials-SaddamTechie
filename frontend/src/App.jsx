import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000') // Replace with Render URL later
      .then(res => setMessage(res.data))
      .catch(err => console.error(err));
  }, []);

  return <h1>{message || 'Personal Blog Platform'}</h1>;
}

export default App;