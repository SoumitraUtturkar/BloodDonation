import React from 'react';
import './styles/placelist.css';  // CSS specific to PlaceList
import Place from './place';  // Import Place component

function PlaceList() {
  return (
    <div className="place-list">
      <h2>Nearby Places</h2>
      <Place name="Park" type="Outdoor" />
      <Place name="Museum" type="Indoor" />
      <Place name="Beach" type="Outdoor" />
    </div>
  );
}

export default placeList;