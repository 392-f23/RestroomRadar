import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export const Sorter = ({ sortData, setSelected, selected }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" size="sm">
        Sort by {selected == "none" ? "" : selected}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {sortData.map((x) => (
          <Dropdown.Item onClick={() => setSelected(x)}>{x}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
