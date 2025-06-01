const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const donations = [];


const donorApp = express();
donorApp.use(bodyParser.json());

donorApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'donor.html'));
});

donorApp.post('/donate', (req, res) => {
  const { name, food, lat, lng } = req.body;
  donations.push({ name, food, lat: parseFloat(lat), lng: parseFloat(lng) });
  res.send(' Donation Received!');
});

donorApp.listen(3123, () => console.log(' Donor server running on http://localhost:3123'));



const receiverApp = express();
receiverApp.use(bodyParser.json());

receiverApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'receiver.html'));
});

receiverApp.post('/receive', (req, res) => {
  const lat = parseFloat(req.body.lat);
  const lng = parseFloat(req.body.lng);
  res.json(donations);
});

receiverApp.listen(4123, () => console.log(' Receiver server running on http://localhost:4123'));
