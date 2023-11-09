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
        style={{background: 'linear-gradient(#007bff, #66d9ef)', border: 'none'}}
        id="dropdown-basic"
        size="md"
        aria-label="sort"
      >
        Sort by {selectedSortValue == "none" ? "" : selectedSortValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {["none", "distance", "rating"].map((x) => (
          <Dropdown.Item aria-label={x} key={x} onClick={() => setSelectedSortValue(x)}>
            {x}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
