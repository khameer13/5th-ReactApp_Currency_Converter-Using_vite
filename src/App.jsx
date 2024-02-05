import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [Provided, setProvided] = useState("100");
  const [Converted, setConverted] = useState("8200");
  const [currency1var, setCurrency1Var] = useState("inr");
  const [currency2var, setCurrency2Var] = useState("usd");
  const [keys, setKeys] = useState([]);
  var values;

  const handleCurrency1Change = (event) => {
    setCurrency1Var(event.target.value);
  };

  const handleCurrency2Change = (event) => {
    setCurrency2Var(event.target.value);
  };

  const changeProvidedInput = (event) => {
    setProvided(event.target.value);
  };

  const changeConvertedInput = (event) => {
    setConverted(event.target.value);
  };

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency1var}.json`)
      .then((response) => response.json())
      .then((res) => {
        const values = res[currency1var];
        console.log(values);
        setKeys(Object.keys(values));
          const conversionRate = values[currency2var];
          setConverted(Provided * conversionRate);
      });
  }, [currency1var, currency2var, Provided]);
  

  const SwapValues = () => {
    setCurrency1Var(currency2var);
    setCurrency2Var(currency1var);
  };

  return (
    <>
      <div className="body">
        <div className="section1">
          <input
            className="money"
            type="number"
            name="Provided"
            value={Provided}
            onChange={changeProvidedInput}
          />
          <div className="selectcurrency">
            <label htmlFor={currency1var}>Provided:</label>
            <select
              name="currency1"
              id={currency1var}
              value={currency1var}
              onChange={handleCurrency1Change}
            >
              {keys.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="swapbtn" onClick={SwapValues}>
     
        </button>

        <div className="section2">
          <input
            className="money"
            type="number"
            name="Converted"
            value={Converted}
            onChange={changeConvertedInput}
          />
          <div className="selectcurrency">
            <label htmlFor={currency2var}>Converted:</label>
            <select
              name="currency2"
              id={currency2var}
              value={currency2var}
              onChange={handleCurrency2Change}
            >
              {keys.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
