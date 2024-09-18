import React from 'react';

function Budget() {
  return (
    <div>
      <h2>Budget-Friendly Weekend Ideas</h2>
      <div className="card">
        <h3>Picnic in the Park</h3>
        <p>Enjoy a budget-friendly picnic with friends or family at a local park.</p>
      </div>
      <div className="card">
        <h3>Hiking Adventure</h3>
        <p>Explore local hiking trails for a cost-effective way to enjoy nature.</p>
      </div>
      <div className="card">
        <h3>Local Museums</h3>
        <p>Visit local museums and cultural centers. Many offer free or low-cost admission.</p>
      </div>
    </div>
  );
}
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:5000/budget')
  .then(response => response.json())
  .then(data => {
      const budgetContainer = document.querySelector('.budget-section');
      budgetContainer.innerHTML = ''; // Clear previous content

      data.forEach(item => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
          budgetContainer.appendChild(card);
      });
  })
  .catch(err => {
      console.error('Error fetching data:', err);
  });
});

export default Budget;