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
  const [foundStruct2, setFoundStruct2] = useState(null);

  const handleChange = (level, event) => {
    const selectedOption = (level === 1)
      ? data.struct[event.target.value]
      : foundStruct[event.target.value];

    if (level === 1) {
      setSelectedValue(event.target.value);
    }

    if (selectedOption.struct) {
      if (level === 1) {
        setFoundStruct(selectedOption.struct);
      } else {
        setFoundStruct2(selectedOption.struct);
      }
    } else {
      if (level === 1) {
        setFoundStruct(null);
      } else {
        setFoundStruct2(null);
      }
    }
  };

  return (
    <div>
      <Dropdown
        options={data.struct}
        value={selectedValue}
        onChange={(event) => handleChange(1, event)}
      />
      {foundStruct && (
        <Dropdown
          options={foundStruct}
          onChange={(event) => handleChange(2, event)}
        />
      )}
      {foundStruct2 && (
        <Dropdown
          options={foundStruct2}
          onChange={() => {}}
        />
      )}
    </div>
  );
};

export default App;
