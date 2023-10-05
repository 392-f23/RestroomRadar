import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import RestroomCard from "./components/Card/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./components/Banner/Banner";
import BathroomHeader from "./components/BathroomHeader/BathroomHeader";
import AddressBar from "./components/AddressBar/AddressBar";
import { results } from './dummyData.json';

const App = () => {
  console.log(results);
  return (
    <div className="App">
      <Banner />
      <BathroomHeader />
      <AddressBar address={"122 W Jackson Rd Chicago, IL 60604"}/>
      <div className="restroom-cards">
        {results.map( (result) => <RestroomCard name={result.name} address={result.address} distance={result.vicinity} busy={result.busyLevel} rating={result.rating}/>)}
      </div>
    </div>
  );
};

export default App;
