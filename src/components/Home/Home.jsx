import { useState, useEffect } from "react";
import "./Home.css";
import RestroomCard from "../Card/Card";
import BathroomHeader from "../BathroomHeader/BathroomHeader";
import AddressBar from "../AddressBar/AddressBar";
import { Sorter } from "../Sorter/Sorter";
import "bootstrap/dist/css/bootstrap.min.css";
import { reviews } from "../../dummyReviews.json";
import Stack from "react-bootstrap/Stack";
import { Filter } from "../Filter/Filter";
import { ReviewList } from "../ReviewList/ReviewList";
import { Modal } from "../Modal/Modal";
import {
  getCoordinateLocation,
  getNearbyRestrooms,
} from "../../utilities/googleApiCalls";

const Home = () => {
  const [restroomData, setRestroomData] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
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
    getCoordinateLocation("1205 S 4th Street St. Charles", setCoordinates);
  }, []);

  // using useEffect to set state when coordinates change: https://daveceddia.com/useeffect-hook-examples/
  useEffect(() => {
    getNearbyRestrooms(coordinates, setNearbyPlaces, setRestroomData);
  }, [coordinates]);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <BathroomHeader />

      <Modal open={open} close={closeModal}>
        <ReviewList selected={selected} reviews={reviews} />
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
              key={result.id}
              result={result}
              openModal={openModal}
              setSelected={setSelected}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
