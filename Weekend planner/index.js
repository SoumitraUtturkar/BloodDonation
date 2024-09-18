import React from 'react';
import ReactDOM from 'react-dom';
import './style/app.css';  // Import global CSS
import App from './app';  // Import main App component

ReactDOM.render(
  <React.StrictMode>
    <App />  {/* Render the main App component */}
  </React.StrictMode>,
  document.getElementById('root')  // Connect to the root div in index.html
);
const express = require('express');
const cors = require('cors');
const PORT = 5000;

app.use(cors());

// Mock Data
const places = [
  { id: 1, name: 'Park', category: 'Outdoor', location: 'Central' },
  { id: 2, name: 'Museum', category: 'Indoor', location: 'Downtown' },
  { id: 3, name: 'Beach', category: 'Outdoor', location: 'Seaside' },
];

// Endpoint to get places
app.get('/api/places', (req, res) => {
  res.json(places);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const mongoose = require('mongoose');
const Place = require('./models/Place');

mongoose.connect('mongodb://localhost:27017/weekend-planner', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/places', async (req, res) => {
  const places = await Place.find();
  res.json(places);
});

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/getaways', (req, res) => {
  res.json([
    { title: 'Mountain Retreat', description: 'Escape to the mountains for a relaxing weekend away from the city.' },
    { title: 'Beach Paradise', description: 'Relax on the sandy shores and soak up the sun.' },
    { title: 'Country Escape', description: 'Experience the charm of the countryside with cozy cottages.' }
  ]);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});