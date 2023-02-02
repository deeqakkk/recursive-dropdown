import React, { useState } from 'react';
import data from './data.json';
import { Row, Col, Form, FormControl, Button } from 'react-bootstrap';

const Dropdown = ({ options, onChange, value }) => (
  <FormControl className='mb-4' as="select" value={value || 'Select Items'} onChange={onChange}>
    {options.map((option, i) => (
      <option key={i} value={i}>
        {option.name}
      </option>
    ))}
  </FormControl>
);

const SelectedValues = ({ values }) => (
  <Col xs={6}>
    <h3>Selected values:</h3>
    <ul>
      {values.map((value, index) => (
        <li key={index}>{value}</li>
      ))}
    </ul>
  </Col>
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
    <Row>
      <Col xs={6}>
        <Form>
          {selectedValues.map((selectedValue, index) => (
            <Form.Group key={index}>
              <Dropdown
                options={
                  selectedValues
                    .slice(0, index)
                    .reduce((currentOption, selectedValue) => currentOption[selectedValue].struct, data.struct)
                }
                value={selectedValue}
                onChange={(event) => handleChange(index, event)}
              />
            </Form.Group>
          ))}
          {currentOption && currentOption.length > 0 ? (
            <Form.Group>
              <Dropdown
                options={currentOption}
                onChange={(event) => handleChange(selectedValues.length, event)}
              />
            </Form.Group>
          ) : null}
        </Form>
      </Col>
      <SelectedValues values={selectedValues} />
    </Row>
  );
};

export default App;
