mport { useState, useEffect } from "react";
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
const Homepage = () => {
    <div>
        
    </div>
};

export default Homepage;
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