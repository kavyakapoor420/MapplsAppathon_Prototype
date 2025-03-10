// src/config/mapConfig.js

// Using the provided Mappls API key
const MAP_CONFIG = {
  MAPPLS_API_KEY: "18daea6d89db814ff7c19493a8a9509c", // Your Mappls API key
  DEFAULT_CENTER: [20.5937, 78.9629], // Center of India
  DEFAULT_ZOOM: 5,
  // Using OpenStreetMap tiles for now, can be replaced with Mappls tiles if available
  TILE_LAYER: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

export default MAP_CONFIG; 