import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon, 
  UserGroupIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ArrowLeftIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import EventMap from '../components/events/EventMap';
import { mockEvents } from '../utils/mockData';
import MAP_CONFIG from '../config/mapConfig';
import 'leaflet/dist/leaflet.css';

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  
  useEffect(() => {
    // Simulate API call
    const fetchEvent = () => {
      setLoading(true);
      setTimeout(() => {
        const foundEvent = mockEvents.find(e => e.id === parseInt(id));
        setEvent(foundEvent || null);
        setLoading(false);
      }, 500);
    };
    
    fetchEvent();
    
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
  }, [id]);
  
  const handleRegister = () => {
    // Simulate registration
    setTimeout(() => {
      setRegistered(true);
      // In a real app, we would make an API call here
    }, 500);
  };
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-60 bg-gray-200 rounded-lg mb-6"></div>
          <div className="md:flex md:gap-8">
            <div className="md:w-2/3">
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
            </div>
            <div className="md:w-1/3 mt-6 md:mt-0">
              <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Link to="/events">
            <Button variant="primary">Browse All Events</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Format date
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/events" className="inline-flex items-center text-primary-600 hover:text-primary-800">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Events
        </Link>
      </div>
      
      <div className="relative mb-8">
        <img 
          src={event.image || 'https://via.placeholder.com/1200x400?text=Event+Image'} 
          alt={event.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg"
        />
        <div className="absolute top-4 right-4">
          <Badge variant={getCategoryVariant(event.category)}>{event.category}</Badge>
        </div>
      </div>
      
      <div className="md:flex md:gap-8">
        <div className="md:w-2/3 mb-8 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <CalendarIcon className="h-5 w-5 mr-2 text-primary-500" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <ClockIcon className="h-5 w-5 mr-2 text-primary-500" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPinIcon className="h-5 w-5 mr-2 text-primary-500" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <UserGroupIcon className="h-5 w-5 mr-2 text-primary-500" />
              <span>{event.attendees} attendees</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Event</h2>
            <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Location</h2>
            {event.latitude && event.longitude ? (
              <div className="h-[500px] rounded-lg overflow-hidden">
                <MapContainer 
                  center={[event.latitude, event.longitude]} 
                  zoom={14} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url={MAP_CONFIG.TILE_LAYER}
                    attribution={MAP_CONFIG.ATTRIBUTION}
                  />
                  <Marker position={[event.latitude, event.longitude]}>
                    <Popup>
                      <div>
                        <h5 className="font-medium">{event.title}</h5>
                        <p className="text-sm">{event.location}</p>
                      </div>
                    </Popup>
                  </Marker>
                  {userLocation && (
                    <Marker position={[userLocation.latitude, userLocation.longitude]}>
                      <Popup>Your Location</Popup>
                    </Marker>
                  )}
                </MapContainer>
              </div>
            ) : (
              <EventMap 
                events={[event]} 
                selectedEvent={event}
              />
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Organizer</h2>
            <Card className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <UserIcon className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{event.organizer}</h3>
                  <div className="mt-1 space-y-1">
                    {event.contactEmail && (
                      <div className="flex items-center text-sm text-gray-600">
                        <EnvelopeIcon className="h-4 w-4 mr-1" />
                        <a href={`mailto:${event.contactEmail}`} className="hover:text-primary-600">
                          {event.contactEmail}
                        </a>
                      </div>
                    )}
                    {event.contactPhone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <PhoneIcon className="h-4 w-4 mr-1" />
                        <a href={`tel:${event.contactPhone}`} className="hover:text-primary-600">
                          {event.contactPhone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <Card className="sticky top-4">
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Event Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-3 text-primary-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Date</div>
                      <div className="text-sm text-gray-600">{formattedDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 mr-3 text-primary-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Time</div>
                      <div className="text-sm text-gray-600">{event.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-3 text-primary-500" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Location</div>
                      <div className="text-sm text-gray-600">{event.location}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-900">Reward Points</div>
                  <div className="text-sm font-bold text-primary-600">{event.points} points</div>
                </div>
                <p className="text-xs text-gray-600">
                  Earn points by attending this event. Points can be redeemed for rewards.
                </p>
              </div>
              
              {registered ? (
                <div className="text-center">
                  <div className="bg-green-50 text-green-800 rounded-md p-3 mb-4">
                    You're registered for this event!
                  </div>
                  <Button variant="outline" className="w-full mb-3">
                    Add to Calendar
                  </Button>
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    <ShareIcon className="h-4 w-4 mr-2" />
                    Share Event
                  </Button>
                </div>
              ) : (
                <div>
                  <Button 
                    variant="primary" 
                    className="w-full mb-3"
                    onClick={handleRegister}
                  >
                    Register for Event
                  </Button>
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    <ShareIcon className="h-4 w-4 mr-2" />
                    Share Event
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
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

export default EventDetailPage; 