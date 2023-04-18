import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const data = [
  { option: '0' },
  { option: '1' },
  { option: '2' },
  { option: '3' },
  { option: '4' },
  { option: '5' },
  { option: '6' },
  { option: '7' },
];

const Roulette = ({ onResultChange }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState(null);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handlePrizeNumberChange = (newPrizeNumber) => {
    setPrizeNumber(newPrizeNumber);
    setMustSpin(false);
  };

  const handleStopSpinning = () => {
    if (data[prizeNumber]) {
      const selectedOption = data[prizeNumber].option;
      setSelectedPrize(selectedOption);
      onResultChange(selectedOption);
    }
    setMustSpin(false);
  };

  return (
    <>
      <div className="res">Result: {selectedPrize}</div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={handleStopSpinning}
      />
      <button onClick={handleSpinClick}>SPIN</button>
      {selectedPrize && (
        <div className="selected-prize">Selected prize: {selectedPrize}</div>
      )}
    </>
  );
};

export default Roulette;
