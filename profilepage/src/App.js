import { Route, Routes } from "react-router-dom";
// import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Barchart from "./components/Barchart";
import { getBarchartData } from "./components/Barchart";
import Linechart from "./components/Linechart.js";
import { getLinechartData } from "./components/Linechart.js";
import { getProfileData } from "./components/Profile";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile profileData={getProfileData()} />} />
        <Route path="/barchart" element={<Barchart barData={getBarchartData()} />} />
        <Route path="/linechart" element={<Linechart lineData={getLinechartData()} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
