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
    <div>
      <Banner title={user || user2 ? "RestroomRadar" : ""} />
      {user || user2 ? <Home /> : <Signin cont={continueAsGuest} />}
    </div>
  );
};

export default App;

{
  /* <BrowserRouter>
<Banner title={user || user2 ? "RestroomRadar" : ""} />
<Routes>
  <Route
    path="/"
    element={user || user2 ? <Home /> : <Signin cont={continueAsGuest} />}
  />
  <Route path="/review_form/:restroomId" element={<ReviewForm />} />
</Routes>
</BrowserRouter> */
}
