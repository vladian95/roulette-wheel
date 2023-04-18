// import React, { useState } from 'react';
// import { Wheel } from 'react-custom-roulette';

// const data = [
//   { option: '0' },
//   { option: '1' },
//   { option: '2' },
//   { option: '3' },
//   { option: '4' },
//   { option: '5' },
//   { option: '6' },
//   { option: '7' },
// ];

// const Rolette = () => {
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);

//   const handleSpinClick = () => {
//     if (!mustSpin) {
//       const newPrizeNumber = Math.floor(Math.random() * data.length);
//       setPrizeNumber(newPrizeNumber);
//       setMustSpin(true);
//     }
//   };
//   return <>
//   <Wheel
//     mustStartSpinning={mustSpin}
//     prizeNumber={prizeNumber}
//     data={data}

//     onStopSpinning={() => {
//       setMustSpin(false);
//     }}
//   />
//   <button onClick={handleSpinClick}>SPIN</button>
// </>;
// };

// export default Rolette;

import React, { useState, useEffect } from 'react';
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

const Rolette = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [lastSpinDate, setLastSpinDate] = useState(null);

  useEffect(() => {
    const lastSpin = localStorage.getItem('lastSpinDate');
    setLastSpinDate(lastSpin ? new Date(lastSpin) : null);
  }, []);

  const handleSpinClick = () => {
    if (lastSpinDate && !isOneMonthPassed(lastSpinDate)) {
      return;
    }

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setLastSpinDate(new Date());
    localStorage.setItem('lastSpinDate', new Date().toISOString());
  };

  const isOneMonthPassed = (date) => {
    const now = new Date();
    const lastSpin = new Date(date);
    const monthDiff =
      (now.getFullYear() - lastSpin.getFullYear()) * 12 +
      (now.getMonth() - lastSpin.getMonth());
    return monthDiff >= 1;
  };

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <button onClick={handleSpinClick}>SPIN</button>
      {lastSpinDate && (
        <p>
          последний розыгрыш был: {new Date(lastSpinDate).toLocaleDateString()}
        </p>
      )}
    </>
  );
};

export default Rolette;
