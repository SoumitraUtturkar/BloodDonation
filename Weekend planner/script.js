function navigateTo(page) {
    window.location.href = page;
  }
  async function fetchWeather() {
    try {
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=YourCity&appid=YourAPIKey&units=metric');
      const data = await response.json();
      document.querySelector('.weather-info').innerHTML = `
        <div class="card">
          <h3>${data.weather[0].main}</h3>
          <p>${data.main.temp}°C</p>
        </div>
      `;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
  // Call the function when the weather page loads
  if (window.location.pathname.includes('weather.html')) {
    fetchWeather();
  }
  function searchNearby() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    // Logic for searching places or events based on query
    alert('You searched for: ' + query);
}
  
  
  
  
  
  
  
  
  
  