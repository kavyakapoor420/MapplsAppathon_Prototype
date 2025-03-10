import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { mockEvents } from '../utils/mockData';
import MAP_CONFIG from '../config/mapConfig';
import 'leaflet/dist/leaflet.css';

const MapPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
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
  
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };
  
  const handleViewDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };
  
  // Calculate default center based on user location or first event
  const getMapCenter = () => {
    if (userLocation) {
      return [userLocation.latitude, userLocation.longitude];
    } else if (events.length > 0 && events[0].latitude && events[0].longitude) {
      return [events[0].latitude, events[0].longitude];
    }
    return MAP_CONFIG.DEFAULT_CENTER;
  };
  
  // Helper function to determine badge variant based on category
  const getCategoryVariant = (category) => {
    const variants = {
      'Cleaning Drive': 'primary',
      'Awareness': 'info',
      'Education': 'secondary',
      'Health': 'success',
      'Sports': 'warning',
      'Other': 'default',
    };
    
    return variants[category] || 'default';
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Events Near You</h1>
        <p className="text-gray-600">
          Explore the map to find events happening in your area. Click on markers to see event details.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map */}
        <div className="lg:w-2/3">
          <div className="h-[600px] rounded-lg overflow-hidden shadow-md">
            {!loading ? (
              <MapContainer 
                center={getMapCenter()} 
                zoom={10} 
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url={MAP_CONFIG.TILE_LAYER}
                  attribution={MAP_CONFIG.ATTRIBUTION}
                />
                
                {/* User location marker */}
                {userLocation && (
                  <Marker position={[userLocation.latitude, userLocation.longitude]}>
                    <Popup>Your Location</Popup>
                  </Marker>
                )}
                
                {/* Event markers */}
                {events.filter(event => event.latitude && event.longitude).map((event) => (
                  <Marker
                    key={event.id}
                    position={[event.latitude, event.longitude]}
                    eventHandlers={{
                      click: () => handleEventClick(event),
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h5 className="font-medium text-gray-900">{event.title}</h5>
                        <p className="text-sm text-gray-500">{event.location}</p>
                        <button 
                          className="mt-2 text-sm text-primary-600 hover:text-primary-800"
                          onClick={() => handleViewDetails(event.id)}
                        >
                          View Details
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            )}
          </div>
        </div>
        
        {/* Event list */}
        <div className="lg:w-1/3">
          <Card className="h-full">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedEvent ? 'Selected Event' : 'Nearby Events'}
              </h2>
            </div>
            
            <div className="p-4">
              {selectedEvent ? (
                <div>
                  <div className="mb-4">
                    <Badge variant={getCategoryVariant(selectedEvent.category)}>
                      {selectedEvent.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{selectedEvent.title}</h3>
                  <p className="text-gray-600 mb-4">{selectedEvent.description.substring(0, 150)}...</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <CalendarIcon className="h-5 w-5 mr-2 text-primary-500" />
                      <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="h-5 w-5 mr-2 text-primary-500" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="primary" 
                      onClick={() => handleViewDetails(selectedEvent.id)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedEvent(null)}
                    >
                      Back to List
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div 
                      key={event.id}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <Badge variant={getCategoryVariant(event.category)} size="sm">
                          {event.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{event.location}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapPage; 