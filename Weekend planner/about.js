document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/about')
    .then(response => response.json())
    .then(data => {
        document.getElementById('page-title').innerText = data.title;
        document.getElementById('about-content').innerText = data.content;
    })
    .catch(err => {
        console.error('Error fetching data:', err);
    });
});