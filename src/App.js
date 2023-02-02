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

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <Dropdown
        options={data.struct}
        value={selectedValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default App;
