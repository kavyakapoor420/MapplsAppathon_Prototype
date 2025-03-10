import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  MapPinIcon, 
  UserGroupIcon, 
  TrophyIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import EventCard from '../components/events/EventCard';
import Button from '../components/ui/Button';
import { mockEvents } from '../utils/mockData';
import MAP_CONFIG from '../config/mapConfig';
import 'leaflet/dist/leaflet.css';

const HomePage = () => {
  // Get featured events (first 3)
  const featuredEvents = mockEvents.slice(0, 3);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // Check if Leaflet is available
    setMapLoaded(true);
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Make a Difference in Your Community
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Join local events organized by NGOs, earn rewards, and create positive impact in your community.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/events">
                  <Button variant="secondary" size="lg">
                    Explore Events
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="bg-transparent border-white text-white hover:bg-white hover:text-primary-700"
                  >
                    Join Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Volunteers working together" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our platform to discover events, participate, and earn rewards for your contributions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Discover Events</h3>
              <p className="text-gray-600">
                Find events near you organized by NGOs and community groups. Filter by category, location, or date.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Participate</h3>
              <p className="text-gray-600">
                Join events that interest you, connect with like-minded people, and make a positive impact in your community.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrophyIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Earn Rewards</h3>
              <p className="text-gray-600">
                Get points for your participation, earn badges, and unlock special rewards as you contribute more.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
            <Link to="/events" className="text-primary-600 hover:text-primary-800 flex items-center">
              View All Events
              <ArrowRightIcon className="h-5 w-5 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Map Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Events Near You</h2>
              <p className="text-xl text-gray-600 mb-6">
                Discover events happening in your area. Use our interactive map to find opportunities to make a difference.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MapPinIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900">Location-Based Discovery</h4>
                    <p className="text-gray-600">Find events based on your current location or search for specific areas.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CalendarIcon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900">Real-Time Updates</h4>
                    <p className="text-gray-600">Get notifications about new events happening near you.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/map">
                  <Button variant="primary">Explore Map</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-4 rounded-lg shadow-md">
                {mapLoaded ? (
                  <div className="h-80 rounded-lg overflow-hidden">
                    <MapContainer 
                      center={MAP_CONFIG.DEFAULT_CENTER} 
                      zoom={5} 
                      style={{ height: '100%', width: '100%' }}
                      zoomControl={false}
                      dragging={false}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        url={MAP_CONFIG.TILE_LAYER}
                        attribution={MAP_CONFIG.ATTRIBUTION}
                      />
                      {featuredEvents.filter(event => event.latitude && event.longitude).map(event => (
                        <Marker
                          key={event.id}
                          position={[event.latitude, event.longitude]}
                        >
                          <Popup>
                            <div>
                              <h5 className="font-medium">{event.title}</h5>
                              <p className="text-sm">{event.location}</p>
                              <Link to={`/events/${event.id}`} className="text-primary-600 text-sm">View Details</Link>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>
                ) : (
                  <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                    <div className="text-center p-6">
                      <MapPinIcon className="h-16 w-16 text-primary-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
                      <p className="text-gray-500">
                        Map is loading or unavailable. Check your connection.
                      </p>
                    </div>
                  </div>
                )}
                <div className="mt-4 text-center">
                  <Link to="/map">
                    <Button variant="primary">Explore Full Map</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our community of volunteers and NGOs working together to create positive change.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button 
                variant="secondary" 
                size="lg"
              >
                Sign Up Now
              </Button>
            </Link>
            <Link to="/events">
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary-700"
              >
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 