import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import RestroomCard from "./components/Card/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./components/Banner/Banner";
import BathroomHeader from "./components/BathroomHeader/BathroomHeader";
import AddressBar from "./components/AddressBar/AddressBar";
import { results } from "./dummyData.json";
import { Sorter } from "./components/Sorter/Sorter";
import Stack from "react-bootstrap/Stack";

const App = () => {
  const [restroomData, setRestroomData] = useState([]);
  const [selectedSortValue, setSelectedSortValue] = useState("");

  const getSelectedSortValue = (value) => {
    setSelectedSortValue(value);
  };

  useEffect(() => {
    let sortedResults = [...results];
    if (selectedSortValue == "rating") {
      sortedResults.sort((a, b) => b[selectedSortValue] - a[selectedSortValue]);
    } else {
      sortedResults.sort((a, b) => a[selectedSortValue] - b[selectedSortValue]);
    }
    setRestroomData(sortedResults);
  }, [selectedSortValue]);

  return (
    <div className="App">
      <Banner />
      <BathroomHeader />

      <Stack direction="horizontal" gap={3} className="justify-content-center">
        <Sorter
          sortData={["none", "distance", "rating"]}
          setSelected={getSelectedSortValue}
          selected={selectedSortValue}
        />
      </Stack>

      <AddressBar address={"122 W Jackson Rd Chicago, IL 60604"} />
      <div className="restroom-cards">
        {restroomData &&
          restroomData.map((result) => (
            <RestroomCard
              name={result.name}
              address={result.address}
              distance={result.distance}
              busy={result.busyLevel}
              rating={result.rating}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
