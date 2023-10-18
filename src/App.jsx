import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "./components/Banner/Banner";
import { useAuth } from "./utilities/firebase";
import { ReviewForm } from "./components/ReviewForm/ReviewForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import { Signin } from "./components/Signin/Signin";

const App = () => {
  const [user] = useAuth();  
  return (
    <BrowserRouter>
      <Banner title={user ? 'RestroomRadar' : ''}/>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Signin />} />
        <Route path="/review_form" element={<ReviewForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
