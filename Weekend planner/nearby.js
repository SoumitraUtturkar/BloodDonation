document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/nearby')
    .then(response => response.json())
    .then(data => {
        const nearbyList = document.getElementById('nearby-list');
        nearbyList.innerHTML = ''; // Clear previous content

        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
            nearbyList.appendChild(card);
        });
    })
    .catch(err => {
        console.error('Error fetching data:', err);
    });
});