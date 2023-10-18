import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export const Filter = ({ data, getFilteredData }) => {
  const [selectedFilterValue, setSelectedFilterValue] = useState("");

  useEffect(() => {
    let filteredResults = [...data];
    if (selectedFilterValue !== "none" && selectedFilterValue !== "") {
      filteredResults = filteredResults.filter(
        (x) => x.types[0] == selectedFilterValue
      );
    }
    getFilteredData(filteredResults);
  }, [selectedFilterValue]);

  let currentOptions = ["none"];
  for (let i = 0; i < data.length; i++) {
    if (!(currentOptions.includes(data[i].types[0]))) {
      currentOptions.push(data[i].types[0]);
    }
  }
  const options = currentOptions;
  console.log(options);

  return (
    <Dropdown>
      <Dropdown.Toggle
        style={{background: 'linear-gradient(#007bff, #66d9ef)', border: 'none'}}
        id="dropdown-basic"
        size="md"
      >
        Filter by {selectedFilterValue == "none" ? "" : selectedFilterValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map((x) => (
          <Dropdown.Item key={x} onClick={() => setSelectedFilterValue(x)}>
            {x}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
