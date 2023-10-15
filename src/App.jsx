import { useState, useEffect } from "react";
import "./App.css";
import RestroomCard from "./components/Card/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./components/Banner/Banner";
import BathroomHeader from "./components/BathroomHeader/BathroomHeader";
import { results } from "./dummyData.json";
import { reviews } from "./dummyReviews.json";
import { Sorter } from "./components/Sorter/Sorter";
import Stack from "react-bootstrap/Stack";
import { Filter } from "./components/Filter/Filter";
import { Modal } from "./components/Modal/Modal";
import { ReviewList } from "./components/ReviewList/ReviewList";
import {
  getCoordinateLocation,
  getNearbyRestrooms,
} from "./utilities/googleApiCalls";
import { ReviewForm } from "./components/ReviewForm/ReviewForm";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import PlacesAutocomplete from "./components/PlacesAutocomplete/PlacesAutocomplete";

const App = () => {
  return (
    <BrowserRouter>
      <Banner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review_form" element={<ReviewForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
