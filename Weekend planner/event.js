document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/events')
    .then(response => response.json())
    .then(events => {
        const eventList = document.getElementById('event-list');
        eventList.innerHTML = ''; // Clear previous content

        events.forEach(event => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h3>${event.title}</h3>
                <p><strong>Date:</strong> ${event.date}</p>
                <p>${event.description}</p>
            `;
            eventList.appendChild(card);
        });
    })
    .catch(err => {
        console.error('Error fetching event data:', err);
    });
});