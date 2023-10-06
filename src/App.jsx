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
import { Filter } from "./components/Filter/Filter";

const App = () => {
  const [restroomData, setRestroomData] = useState(results);

  const getSortedData = (data) => {
    setRestroomData(data);
  };

  const getFilteredData = (data) => {
    setRestroomData(data);
    console.log(data);
  };

  return (
    <div className="App">
      <Banner />
      <BathroomHeader />

      <Stack
        direction="horizontal"
        gap={3}
        className="justify-content-center my-3"
      >
        <Sorter data={restroomData} getSortedData={getSortedData} />
        <Filter data={results} getFilteredData={getFilteredData} />
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
