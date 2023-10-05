import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import RestroomCard from "./components/Card/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./components/Banner/Banner";
import BathroomHeader from "./components/BathroomHeader/BathroomHeader";

const App = () => {
  return (
    <div className="App">
      <Banner />
      <BathroomHeader />
      <div className="restroom-cards">
        <RestroomCard name={"Chipotle"} address={"123 W Jackson Rd"} distance={"372 ft"} busy={"busier than usual"} rating={"5"}/>
        <RestroomCard name={"Chipotle"} address={"123 W Jackson Rd"} distance={"372 ft"} busy={"busier than usual"} rating={"5"}/>
        <RestroomCard name={"Chipotle"} address={"123 W Jackson Rd"} distance={"372 ft"} busy={"busier than usual"} rating={"5"}/>
      </div>
    </div>
  );
};

export default App;
