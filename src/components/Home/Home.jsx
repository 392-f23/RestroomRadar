import { useState, useEffect } from "react";
import "./Home.css";
import RestroomCard from "../Card/Card";
import BathroomHeader from "../BathroomHeader/BathroomHeader";
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
import Fab from "@mui/material/Fab";
import { BiMapAlt } from "react-icons/bi";
import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";

const Home = () => {
  const [restroomData, setRestroomData] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selected, setSelected] = useState();
  const [open, setOpen] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const openMapModal = () => setOpenMap(true);
  const closeMapModal = () => setOpenMap(false);
  // styling floating button: https://stackoverflow.com/questions/65691712/how-to-show-a-floating-action-button-always-in-bottom-of-screen
  const fabStyle = {
    position: "fixed",
    display: "flex",
    left: "1rem",
    bottom: "1rem",
    flexWrap: "wrap-reverse",
    flexDirection: "row-reverse",
    backgroundColor: "blue",
  };

  const getSortedData = (data) => {
    setRestroomData(data);
  };

  const getFilteredData = (data) => {
    setRestroomData(data);
  };

  // // using useEffect on startup: https://www.w3schools.com/react/react_useeffect.asp
  // useEffect(() => {
  //   getCoordinateLocation("1205 S 4th Street St. Charles", setCoordinates);
  // }, []);

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

      <Modal open={openMap} close={closeMapModal}>
        <div
          id="map"
          style={{
            width: "auto",
            height: "550px",
            position: "relative",
            overflow: "hidden",
          }}
        ></div>
      </Modal>

      <Fab
        onClick={openMapModal}
        style={fabStyle}
        sx={Fab.sx}
        aria-label={Fab.label}
        className='fab'
      >
        <h1>
          <BiMapAlt color="white" />
        </h1>
      </Fab>

      <PlacesAutocomplete setCoordinates={setCoordinates} />
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
