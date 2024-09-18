import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Getaways() {
  const [getaways, setGetaways] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/getaways')
      .then(response => setGetaways(response.data))
      .catch(error => console.error('Error fetching getaways:', error));
  }, []);

  return (
    <div>
      <h2>Top Getaways for the Weekend</h2>
      {getaways.map((getaway, index) => (
        <div key={index} className="card">
          <h3>{getaway.title}</h3>
          <p>{getaway.description}</p>
        </div>
      ))}
    </div>
  );
}
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:5000/gateways')
  .then(response => response.json())
  .then(data => {
      const gatewayList = document.getElementById('gateway-list');
      gatewayList.innerHTML = ''; // Clear previous content

      data.forEach(item => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
          gatewayList.appendChild(card);
      });
  })
  .catch(err => {
      console.error('Error fetching data:', err);
  });
});

export default Getaways;