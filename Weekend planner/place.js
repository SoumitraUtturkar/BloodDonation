import React from 'react';

function place({ name, type }) {
  return (
    <div className="place">
      <h3>{name}</h3>
      <p>Type: {type}</p>
    </div>
  );
}

export default place;