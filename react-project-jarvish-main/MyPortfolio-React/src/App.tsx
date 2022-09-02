import { useContext } from "react";
import Home from "./components/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import PortfolioMaker from "./components/PortfolioMaker/PortfolioMaker";
import PersonalDetails from "./components/PersonalDetails/PersonalDetails";
import ProjectWork from "./components/ProjectWork/ProjectWork";
import DisplayPortfolio from "./DisplayPortfolio/DisplayPortfolio";
import ShowRecommendation from "./components/Recommendation/ShowRecommendation";
import AuthContext from "./context/AuthContext";
import { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div>
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout , userId : "" }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/createPortfolio" element={<PortfolioMaker />} />
          <Route path="/portfolio/:userId" element={<DisplayPortfolio />} />
          <Route
            path="/showRecommendation"
            element={<ShowRecommendation></ShowRecommendation>}
          ></Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
