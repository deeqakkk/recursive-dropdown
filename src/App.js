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

const App = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (index, event) => {
    setSelectedValues((prevSelectedValues) => {
      const newSelectedValues = [...prevSelectedValues];
      newSelectedValues[index] = event.target.value;
      return newSelectedValues;
    });
  };

  const createDropdowns = (currentOption, index) => {
    if (!currentOption || !currentOption.length) {
      return null;
    }
    return (
      <Dropdown
        key={index}
        options={currentOption}
        value={selectedValues[index]}
        onChange={(event) => handleChange(index, event)}
      />
    );
  };

  const renderDropdowns = (selectedValues, currentOption) => {
    return selectedValues.reduce((acc, selectedValue, index) => {
      const currentOption = selectedValues
        .slice(0, index)
        .reduce((currentOption, selectedValue) => currentOption[selectedValue].struct, data.struct);
      return [...acc, createDropdowns(currentOption, index)];
    }, [createDropdowns(currentOption, selectedValues.length)]);
  };

  const currentOption = selectedValues.reduce((currentOption, selectedValue) => {
    return currentOption[selectedValue].struct;
  }, data.struct);

  return <div>{renderDropdowns(selectedValues, currentOption)}</div>;
};

export default App;
