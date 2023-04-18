import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Roulette from './components/Roulette';

function App() {
  const [selectedPrize, setSelectedPrize] = useState(null);
  const handleResultChange = (selectedOption) => {
    setSelectedPrize(selectedOption);
  };
  return (
    <div className="App">
      <Roulette onResultChange={handleResultChange} />
      <Form selectedPrize={selectedPrize} />
    </div>
  );
}

export default App;
