import React, { useState } from 'react';
import data from './data.json';

const Dropdown = ({ options, onChange, value }) => (
  <select value={value || ''} onChange={onChange}>
    {options.map((option, i) => (
      <option key={i} value={i}>
        {option.name}
      </option>
    ))}
  </select>
);
const SelectedValues = ({ values }) => (

  <div style={{ float: 'right' }}>
    <h3>Selected values:</h3>
    <ul>
      {values.map((value, index) => (
        console.log(value),
        <li key={index}>{value}</li>
      ))}
    </ul>
  </div>
);

const App = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (index, event) => {
    setSelectedValues((prevSelectedValues) => {
      const newSelectedValues = [...prevSelectedValues];
      newSelectedValues[index] = event.target.value;
      return newSelectedValues;
    });
  };

  const currentOption = selectedValues.reduce((currentOption, selectedValue) => {
    return currentOption[selectedValue].struct;
  }, data.struct);

  return (
    <div  style={{width:'50%'}}>
    {selectedValues.map((selectedValue, index) => (
      <div key={index}>
        <Dropdown
          options={
            selectedValues
              .slice(0, index)
              .reduce((currentOption, selectedValue) => currentOption[selectedValue].struct, data.struct)
          }
          value={selectedValue}
          onChange={(event) => handleChange(index, event)}
        />
      </div>
    ))}
    {currentOption && currentOption.length > 0 ? (
      <div>
        <Dropdown
          options={currentOption}
          onChange={(event) => handleChange(selectedValues.length, event)}
        />
      </div>
    ) : null}
    <SelectedValues values={selectedValues} />
  </div>
);};

export default App;
