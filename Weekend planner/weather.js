document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/weather')
    .then(response => response.json())
    .then(data => {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `<h2>Location: ${data.location}</h2>
                                 <p>Forecast: ${data.forecast}</p>`;
    })
    .catch(err => {
        console.error('Error fetching weather data:', err);
    });
});