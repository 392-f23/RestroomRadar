import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./components/Banner/Banner";
import { useAuth } from "./utilities/firebase";
import { ReviewForm } from "./components/ReviewForm/ReviewForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import { Signin } from "./components/Signin/Signin";
import { useState } from "react";

const App = () => {
  const [user] = useAuth();
  const [user2, setUser2] = useState();
  const continueAsGuest = () => {
    // Create a dummy user object
    const dummyUser = {
      uid: "guest",
      photoURL: null,
      displayName: "Guest",
    };
    setUser2(dummyUser);
  };

  return (
    <BrowserRouter>
      <Banner title={user ? 'RestroomRadar' : ''}/>
      <Routes>
        <Route path='/' element={user || user2 ? <Home /> : <Signin cont={continueAsGuest} />} />
        <Route path="/review_form" element={<ReviewForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
