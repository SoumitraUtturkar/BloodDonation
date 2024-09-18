const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Enable CORS for cross-origin requests
app.use(cors());

// Dummy data for each page
const data = {
    about: {
        title: "About Us",
        content: "We aim to provide the best weekend plans by offering suggestions for outings, budget-friendly options, and local events."
    },


    budget: [
        {
            title: "Cheap Eats",
            description: "Find affordable restaurants nearby for delicious meals without breaking the bank."
        },
        {
            title: "Free Events",
            description: "Attend free community events and activities happening this weekend."
        }
    ],
    event: [
        {
            title: "Food Festival",
            description: "Experience the best local food vendors and chefs."
        },
        {
            title: "Music Concert",
            description: "Attend an open-air concert with local bands."
        }
    ],
    gateway: [
        {
            title: "Beach Resort",
            description: "Relax at a beach resort just a few hours away."
        },
        {
            title: "Mountain Cabin",
            description: "Spend the weekend in a peaceful cabin in the mountains."
        }
    ],
    weather: {
        location: "Your Location",
        forecast: "Sunny with occasional clouds, 25°C."
    }
};

// Define routes for each page
app.get('/about', (req, res) => {
    res.json(data.about);
});

app.get('/budget', (req, res) => {
    res.json(data.budget);
});

app.get('/event', (req, res) => {
    res.json(data.events);
});

app.get('/gateway', (req, res) => {
    res.json(data.gateways);
});

app.get('/nearby', (req, res) => {
    res.json(data.weather);
});


app.get('/weather', (req, res) => {
    res.json(data.weather);
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
const eventRoutes = require('event');
const gatewayRoutes = require('gateway');
const weatherRoutes = require('weather');
const aboutRoutes = require('about');
const budgetRoutes = require('budget');
const nearbyRoutes = require('nearby');


app.use('/api/event', eventRoutes);
app.use('/api/gateway', gatewayRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/nearby', nearbyRoutes);
