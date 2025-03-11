import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CalendarIcon, 
  MapPinIcon, 
  UserGroupIcon, 
  TrophyIcon,
  ArrowRightIcon,
  GiftIcon
} from '@heroicons/react/24/outline';
import EventCard from '../components/events/EventCard';
import Button from '../components/ui/Button';
import { mockEvents } from '../utils/mockData';
import { useTheme } from '../context/ThemeContext';

const HomePage = () => {
  // Get featured events (first 3)
  const featuredEvents = mockEvents.slice(0, 3);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if Leaflet is available
    setMapLoaded(typeof window !== 'undefined' && window.L);
    
    // Initialize Leaflet map if available
    if (typeof window !== 'undefined' && window.L) {
      const homeMap = window.L.map('home-map').setView([20.5937, 78.9629], 5);
      
      // Add tile layer with dark mode support
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        className: darkMode ? 'dark-tiles' : ''
      }).addTo(homeMap);
      
      // Add markers for featured events
      featuredEvents.forEach(event => {
        if (event.latitude && event.longitude) {
          window.L.marker([event.latitude, event.longitude])
            .addTo(homeMap)
            .bindPopup(`
              <div>
                <h5 class="font-medium">${event.title}</h5>
                <p class="text-sm">${event.location}</p>
                <a href="/events/${event.id}" class="text-primary-600">View Details</a>
              </div>
            `);
        }
      });
      
      // Clean up on unmount
      return () => {
        homeMap.remove();
      };
    }
  }, [darkMode, featuredEvents]);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white dark:from-dark-300 dark:to-primary-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 animate-fade-in">
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
                    className="bg-transparent border-white text-white hover:bg-white hover:text-primary-700 dark:hover:text-primary-900"
                  >
                    Join Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Volunteers working together" 
                className="rounded-lg shadow-xl hover-card"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-200 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              Join our platform to discover events, participate, and earn rewards for your contributions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover-card animate-fade-in dark:bg-dark-100">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-primary-900 dark:bg-opacity-30">
                <CalendarIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Discover Events</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find events near you organized by NGOs and community groups. Filter by category, location, or date.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover-card animate-fade-in dark:bg-dark-100" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-primary-900 dark:bg-opacity-30">
                <UserGroupIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Participate</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join events that interest you, connect with like-minded people, and make a positive impact in your community.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover-card animate-fade-in dark:bg-dark-100" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-primary-900 dark:bg-opacity-30">
                <TrophyIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Earn Rewards</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get points for your participation, earn badges, and unlock special rewards as you contribute more.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section className="py-16 dark:bg-dark-300 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Events</h2>
            <Link to="/events" className="text-primary-600 hover:text-primary-800 flex items-center dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-300">
              View All Events
              <ArrowRightIcon className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event, index) => (
              <div key={event.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Map Preview Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-200 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">Find Events Near You</h2>
              <p className="text-xl text-gray-600 mb-6 dark:text-gray-300">
                Discover events happening in your area with our interactive map. Find opportunities to make a difference.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MapPinIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Location-Based Discovery</h4>
                    <p className="text-gray-600 dark:text-gray-300">Find events based on your current location or search for specific areas.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CalendarIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">Real-Time Updates</h4>
                    <p className="text-gray-600 dark:text-gray-300">Get notifications about new events happening near you.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/map">
                  <Button variant="primary">Explore Map</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white p-4 rounded-lg shadow-md dark:bg-dark-100 hover-card">
                {mapLoaded ? (
                  <div className="h-80 rounded-lg overflow-hidden">
                    <div id="home-map" className="h-full w-full"></div>
                  </div>
                ) : (
                  <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center dark:bg-dark-300">
                    <div className="text-center p-6">
                      <MapPinIcon className="h-16 w-16 text-primary-500 mx-auto mb-4 animate-bounce-slow dark:text-primary-400" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">Interactive Map</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Map is loading or unavailable. Check your connection.
                      </p>
                    </div>
                  </div>
                )}
                <div className="mt-4 text-center">
                  <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Link to="/map">
                      <Button variant="primary">View Full Map</Button>
                    </Link>
                    <Link to="/map-demo">
                      <Button variant="secondary">Try Mappls Demo</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="bg-primary-700 text-white py-16 dark:bg-gradient-to-r dark:from-primary-900 dark:to-dark-300 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join our community of volunteers and NGOs working together to create positive change.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
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
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary-700 dark:hover:text-primary-900"
              >
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Donate Food Section */}
      <section className="py-16 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
                Donate Extra Food
              </h2>
              <p className="text-lg text-gray-600 mb-6 dark:text-gray-300">
                Help reduce food waste and feed those in need by donating your extra food to NGOs organizing food donation drives.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/food-donation')}
                  className="flex items-center"
                >
                  <GiftIcon className="h-5 w-5 mr-2" />
                  Donate Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/events')}
                  className="flex items-center"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1593113598332-cd59a0c3a9a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Food donation" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 