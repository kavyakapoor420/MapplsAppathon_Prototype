import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { mockEvents } from '../utils/mockData';

const MapPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapInitialized, setMapInitialized] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate API call to fetch events
    const fetchEvents = () => {
      setLoading(true);
      setTimeout(() => {
        setEvents(mockEvents);
        setLoading(false);
      }, 800);
    };
    
    fetchEvents();
    
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);
  
  // Initialize map after events are loaded
  useEffect(() => {
    if (!loading && !mapInitialized && typeof window.L !== 'undefined') {
      initializeMap();
    }
  }, [loading, mapInitialized]);
  
  const initializeMap = () => {
    // Check if Leaflet is available
    if (!window.L) {
      console.error("Leaflet is not available");
      return;
    }
    
    // Create map instance
    const map = window.L.map('map-container').setView([20.5937, 78.9629], 5);
    
    // Add tile layer
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add markers for events
    events.forEach(event => {
      if (event.latitude && event.longitude) {
        const marker = window.L.marker([event.latitude, event.longitude])
          .addTo(map)
          .bindPopup(`
            <div>
              <h5 class="font-medium">${event.title}</h5>
              <p class="text-sm">${event.location}</p>
              <a href="/events/${event.id}" class="text-primary-600">View Details</a>
            </div>
          `);
          
        marker.on('click', () => {
          setSelectedEvent(event);
        });
      }
    });
    
    // If user location is available, add a marker and center map
    if (userLocation) {
      window.L.marker([userLocation.latitude, userLocation.longitude], {
        icon: window.L.divIcon({
          className: 'user-location-marker',
          html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>'
        })
      }).addTo(map);
      
      map.setView([userLocation.latitude, userLocation.longitude], 10);
    }
    
    // If there's a selected event, open its popup
    if (selectedEvent && selectedEvent.latitude && selectedEvent.longitude) {
      map.setView([selectedEvent.latitude, selectedEvent.longitude], 14);
    }
    
    setMapInitialized(true);
  };
  
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };
  
  const handleViewDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };
  
  // Get color variant based on event category
  const getCategoryVariant = (category) => {
    const categoryMap = {
      'Environment': 'success',
      'Education': 'info',
      'Health': 'warning',
      'Community': 'primary',
      'Fundraising': 'secondary',
      'Animal Welfare': 'success',
      'Disaster Relief': 'danger',
      'Arts & Culture': 'info'
    };
    
    return categoryMap[category] || 'primary';
  };
  
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Explore Events</h1>
        </div>
      </div>
      
      <div className="flex-grow flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-96 bg-white shadow-md z-10 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {selectedEvent ? 'Selected Event' : 'Events Near You'}
            </h2>
            
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-200 p-4 rounded-lg h-32"></div>
                ))}
              </div>
            ) : selectedEvent ? (
              <Card className="mb-4">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">{selectedEvent.title}</h3>
                    <Badge variant={getCategoryVariant(selectedEvent.category)}>
                      {selectedEvent.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    {selectedEvent.location}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {selectedEvent.date}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {selectedEvent.description}
                  </p>
                  <div className="mt-4">
                    <Button 
                      variant="primary" 
                      onClick={() => handleViewDetails(selectedEvent.id)}
                      fullWidth
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {events.map(event => (
                  <Card 
                    key={event.id} 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedEvent && selectedEvent.id === event.id ? 'ring-2 ring-primary-500' : ''
                    }`}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                        <Badge variant={getCategoryVariant(event.category)}>
                          {event.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {event.location}
                      </p>
                      <p className="text-sm text-gray-600 mt-1 flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {event.date}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Map Container */}
        <div className="flex-grow relative">
          {loading ? (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <MapPinIcon className="h-12 w-12 text-primary-500 mx-auto animate-bounce" />
                <p className="mt-2 text-gray-600">Loading map...</p>
              </div>
            </div>
          ) : (
            <div id="map-container" className="absolute inset-0"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage; 