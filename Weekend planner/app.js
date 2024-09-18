
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Getaways from './components/Getaways';
import Budget from './components/Budget';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getaways" element={<Getaways />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </Router>
  );
}


import './styles/app.css'; // Import global CSS styles

function App() {
  return (
    <div className="App">
      <h1>Weekend Planner</h1>
      <PlaceList /> {/* Render the PlaceList component */}
    </div>
  );
}

export default app;