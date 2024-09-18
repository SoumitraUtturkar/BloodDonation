import React, { useState, useEffect } from 'react';
import PlaceList from './components/PlaceList';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch('/api/places')
      .then((res) => res.json())
      .then((data) => setPlaces(data));
  }, []);

  return (
    <div>
      <Header />
      <PlaceList places={places} />
    </div>
  );
};

export default App;