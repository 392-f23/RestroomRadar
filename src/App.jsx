import { useState } from "react";
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

const App = () => {
  const [restroomData, setRestroomData] = useState(results);
  const [selected, setSelected] = useState();
  const [open, setOpen] = useState(false);

  const getSortedData = (data) => {
    setRestroomData(data);
  };

  const getFilteredData = (data) => {
    setRestroomData(data);
  };

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className="App">
      <Banner />
      <BathroomHeader />

      <Modal open={open} close={closeModal}>
        <ReviewList selected={selected} reviews={reviews}/>
      </Modal>

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
              key = {result.id}
              result={result}
              openModal={openModal}
              setSelected={setSelected}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
