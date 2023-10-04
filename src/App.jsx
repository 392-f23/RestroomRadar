import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import RestroomCard from "./components/Card/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="restroom-card">
        <RestroomCard />
      </div>
    </div>
  );
};

export default App;
