import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import RestroomCard from "./components/Card/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./components/Banner/Banner";
import BathroomHeader from "./components/BathroomHeader/BathroomHeader";
import AddressBar from "./components/AddressBar/AddressBar";

const App = () => {
  return (
    <div className="App">
      <Banner />
      <BathroomHeader />
      <AddressBar address={"122 W Jackson Rd Chicago, IL 60604"}/>
      <div className="restroom-cards">
        <RestroomCard name={"Chipotle"} address={"123 W Jackson Rd"} distance={"372 ft"} busy={"busier than usual"} rating={"5"}/>
        <RestroomCard name={"Chipotle"} address={"123 W Jackson Rd"} distance={"372 ft"} busy={"busier than usual"} rating={"5"}/>
        <RestroomCard name={"Chipotle"} address={"123 W Jackson Rd"} distance={"372 ft"} busy={"busier than usual"} rating={"5"}/>
      </div>
    </div>
  );
};

export default App;
