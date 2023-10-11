import { useState, useEffect } from "react";
import "./App.css";
import RestroomCard from "./components/Card/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./components/Banner/Banner";
import BathroomHeader from "./components/BathroomHeader/BathroomHeader";
import AddressBar from "./components/AddressBar/AddressBar";
import { results } from "./dummyData.json";
import { reviews } from './dummyReviews.json';
import { Sorter } from "./components/Sorter/Sorter";
import Stack from "react-bootstrap/Stack";
import { Filter } from "./components/Filter/Filter";
import { Modal } from "./components/Modal/Modal";
import { ReviewList } from "./components/ReviewList/ReviewList";
import { getCoordinateLocation, getNearbyRestrooms } from "./utilities/googleApiCalls";
import { ReviewForm } from "./components/ReviewForm/ReviewForm";
import { render } from "react-dom";

const App = () => {
  const [restroomData, setRestroomData] = useState([]);
  const [coordinates, setCoordinates] = useState({lat: null,lon: null});
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selected, setSelected] = useState();
  const [open, setOpen] = useState(false);

  const getSortedData = (data) => {
    setRestroomData(data);
  };

  const getFilteredData = (data) => {
    setRestroomData(data);
  };

  // using useEffect on startup: https://www.w3schools.com/react/react_useeffect.asp
  useEffect(() => {
    getCoordinateLocation('1205 S 4th Street St. Charles',setCoordinates);
  }, []);

  // using useEffect to set state when coordinates change: https://daveceddia.com/useeffect-hook-examples/
  useEffect(() => {
    getNearbyRestrooms(coordinates,setNearbyPlaces,setRestroomData);
  }, [coordinates]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className="App">
      <Banner />
      <ReviewForm/>


      {/* <BathroomHeader />

      <Modal open={open} close={closeModal}>
        <ReviewList selected={selected} reviews={reviews}/>
      </Modal>

      <Stack
        direction="horizontal"
        gap={3}
        className="justify-content-center my-3"
      >
        <Sorter data={nearbyPlaces} getSortedData={getSortedData} />
        <Filter data={nearbyPlaces} getFilteredData={getFilteredData} />
      </Stack>

      <AddressBar address={"122 W Jackson Rd Chicago, IL 60604"} />
      <div className="restroom-cards">
        {restroomData &&
          restroomData.map((result) => (
            <RestroomCard
              key = {result.id}
              result={result}
              openModal={openModal}
              setSelected={setSelected}
            />
          ))}
      </div> */}
    </div>
  );
};

export default App;
