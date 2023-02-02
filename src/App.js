import React, { useState } from 'react';
import data from './data.json';

const Dropdown = ({ options, onChange, value }) => {
  return (
    <select value={value || ''} onChange={onChange}>
      {options.map((option, i) => (
        <option key={i} value={i}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [foundStruct, setFoundStruct] = useState(null);

  const handleChange = (event) => {
    const selectedOption = data.struct[event.target.value];
    setSelectedValue(event.target.value);

    if (selectedOption.struct) {
      setFoundStruct(selectedOption.struct);
    } else {
      setFoundStruct(null);
    }
  };

  return (
    <div>
      <Dropdown
        options={data.struct}
        value={selectedValue}
        onChange={handleChange}
      />
      {foundStruct && (
        <Dropdown
          options={foundStruct}
          onChange={() => {}}
        />
      )}
    </div>
  );
};

export default App;
