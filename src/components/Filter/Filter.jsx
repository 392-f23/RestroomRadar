import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export const Filter = ({ data, getFilteredData }) => {
  const [selectedFilterValue, setSelectedFilterValue] = useState("");

  useEffect(() => {
    let filteredResults = [...data];
    if (selectedFilterValue !== "none") {
      filteredResults = filteredResults.filter(
        (x) => x.busyLevel == selectedFilterValue
      );
    }
    getFilteredData(filteredResults);
  }, [selectedFilterValue]);

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="outline-secondary"
        id="dropdown-basic"
        size="sm"
      >
        Filter by {selectedFilterValue == "none" ? "" : selectedFilterValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {["none", "Busier than usual", "Not Busy", "Busy"].map((x) => (
          <Dropdown.Item onClick={() => setSelectedFilterValue(x)}>
            {x}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
