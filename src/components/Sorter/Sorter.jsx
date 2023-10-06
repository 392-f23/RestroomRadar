import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

export const Sorter = ({ data, getSortedData }) => {
  const [selectedSortValue, setSelectedSortValue] = useState("");

  useEffect(() => {
    let sortedResults = [...data];
    if (selectedSortValue === "rating") {
      sortedResults.sort((a, b) => b[selectedSortValue] - a[selectedSortValue]);
    } else if (selectedSortValue !== "") {
      sortedResults.sort((a, b) => a[selectedSortValue] - b[selectedSortValue]);
    }
    getSortedData(sortedResults);
  }, [selectedSortValue]);

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="outline-secondary"
        id="dropdown-basic"
        size="sm"
      >
        Sort by {selectedSortValue == "none" ? "" : selectedSortValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {["none", "distance", "rating"].map((x) => (
          <Dropdown.Item onClick={() => setSelectedSortValue(x)}>
            {x}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
