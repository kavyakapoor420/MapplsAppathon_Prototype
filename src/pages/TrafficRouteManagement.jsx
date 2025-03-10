// import React, { useState, useEffect } from 'react';
// import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';
// import Card from '../components/ui/Card';
// import Button from '../components/ui/Button';
// import Badge from '../components/ui/Badge';
// import { mockEvents } from '../utils/mockData';

// const TrafficRouteManagement = () => {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [parkingSpots, setParkingSpots] = useState([]);
//   const [route, setRoute] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);

//   // Fetch events on component mount
//   useEffect(() => {
//     const fetchEvents = () => {
//       setLoading(true);
//       setTimeout(() => {
//         setEvents(mockEvents);
//         setLoading(false);
//       }, 800);
//     };
//     fetchEvents();

//     // Get user's current location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error('Error fetching location:', error);
//         }
//       );
//     }
//   }, []);

//   // Fetch parking spots near the selected event
//   useEffect(() => {
//     if (selectedEvent) {
//       fetchParkingSpots(selectedEvent.latitude, selectedEvent.longitude);
//     }
//   }, [selectedEvent]);

//   // Fetch parking spots using Mappls Place Search API
//   const fetchParkingSpots = async (lat, lng) => {
//     const apiKey = '18daea6d89db814ff7c19493a8a9509c'; // Replace with your Mappls API key
//     const radius = 5000; // Search within 5km radius
//     const url = `https://apis.mappls.com/advancedmaps/v1/${apiKey}/place_search?query=parking&location=${lat},${lng}&radius=${radius}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setParkingSpots(data.suggestedLocations || []);
//     } catch (error) {
//       console.error('Error fetching parking spots:', error);
//     }
//   };

//   // Calculate the shortest route using Mappls Directions API
//   const calculateRoute = async () => {
//     if (!userLocation || !selectedEvent) return;

//     const apiKey = '18daea6d89db814ff7c19493a8a9509c'; // Replace with your Mappls API key
//     const start = `${userLocation.longitude},${userLocation.latitude}`;
//     const end = `${selectedEvent.longitude},${selectedEvent.latitude}`;
//     const url = `https://apis.mappls.com/advancedmaps/v1/${apiKey}/route?start=${start}&end=${end}&steps=true`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setRoute(data.routes[0]); // Use the first route
//     } catch (error) {
//       console.error('Error calculating route:', error);
//     }
//   };

//   // Handle event selection
//   const handleEventClick = (event) => {
//     setSelectedEvent(event);
//     setRoute(null); // Reset route when a new event is selected
//   };

//   // Render parking spots
//   const renderParkingSpots = () => {
//     if (parkingSpots.length === 0) return <p>No parking spots found nearby.</p>;

//     return parkingSpots.map((spot, index) => (
//       <div key={index} className="p-2 border-b">
//         <p className="font-medium">{spot.placeName}</p>
//         <p className="text-sm text-gray-600">{spot.placeAddress}</p>
//       </div>
//     ));
//   };

//   // Render route details
//   const renderRouteDetails = () => {
//     if (!route) return null;

//     return (
//       <div className="p-4 bg-gray-50 rounded-lg">
//         <p className="font-medium">Route Details:</p>
//         <p>Distance: {route.distance} km</p>
//         <p>Duration: {route.duration} mins</p>
//         <p>Steps:</p>
//         <ul>
//           {route.steps.map((step, index) => (
//             <li key={index} className="text-sm text-gray-600">
//               {step.instruction}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   return (
//     <div className="h-screen flex flex-col">
//       <div className="bg-white shadow-sm z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <h1 className="text-2xl font-bold text-gray-900">Traffic Route Management</h1>
//         </div>
//       </div>

//       <div className="flex-grow flex overflow-hidden">
//         {/* Sidebar */}
//         <div className="w-96 bg-white shadow-md z-10 overflow-y-auto">
//           <div className="p-4">
//             <h2 className="text-lg font-medium text-gray-900 mb-4">
//               {selectedEvent ? 'Selected Event' : 'Events Near You'}
//             </h2>

//             {loading ? (
//               <div className="animate-pulse space-y-4">
//                 {[...Array(3)].map((_, i) => (
//                   <div key={i} className="bg-gray-200 p-4 rounded-lg h-32"></div>
//                 ))}
//               </div>
//             ) : selectedEvent ? (
//               <Card className="mb-4">
//                 <div className="p-4">
//                   <div className="flex justify-between items-start">
//                     <h3 className="text-lg font-medium text-gray-900">{selectedEvent.title}</h3>
//                     <Badge variant="warning">Crowded</Badge>
//                   </div>
//                   <p className="text-sm text-gray-600 mt-1 flex items-center">
//                     <MapPinIcon className="h-4 w-4 mr-1" />
//                     {selectedEvent.location}
//                   </p>
//                   <p className="text-sm text-gray-600 mt-1 flex items-center">
//                     <CalendarIcon className="h-4 w-4 mr-1" />
//                     {selectedEvent.date}
//                   </p>
//                   <div className="mt-4">
//                     <Button variant="primary" onClick={calculateRoute} fullWidth>
//                       Calculate Route
//                     </Button>
//                   </div>
//                 </div>
//               </Card>
//             ) : (
//               <div className="space-y-4">
//                 {events.map((event) => (
//                   <Card
//                     key={event.id}
//                     className="cursor-pointer transition-all duration-200 hover:shadow-lg"
//                     onClick={() => handleEventClick(event)}
//                   >
//                     <div className="p-4">
//                       <div className="flex justify-between items-start">
//                         <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
//                         <Badge variant="warning">Crowded</Badge>
//                       </div>
//                       <p className="text-sm text-gray-600 mt-1 flex items-center">
//                         <MapPinIcon className="h-4 w-4 mr-1" />
//                         {event.location}
//                       </p>
//                       <p className="text-sm text-gray-600 mt-1 flex items-center">
//                         <CalendarIcon className="h-4 w-4 mr-1" />
//                         {event.date}
//                       </p>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             )}

//             {/* Parking Spots */}
//             {selectedEvent && (
//               <div className="mt-6">
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">Nearby Parking Spots</h3>
//                 {renderParkingSpots()}
//               </div>
//             )}

//             {/* Route Details */}
//             {selectedEvent && renderRouteDetails()}
//           </div>
//         </div>

//         {/* Map Container */}
//         <div className="flex-grow relative">
//           {loading ? (
//             <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
//               <div className="text-center">
//                 <MapPinIcon className="h-12 w-12 text-primary-500 mx-auto animate-bounce" />
//                 <p className="mt-2 text-gray-600">Loading map...</p>
//               </div>
//             </div>
//           ) : (
//             <iframe
//               src={`https://apis.mappls.com/advancedmaps/v1/18daea6d89db814ff7c19493a8a9509c/map?center=${selectedEvent ? selectedEvent.latitude : userLocation?.latitude},${selectedEvent ? selectedEvent.longitude : userLocation?.longitude}&zoom=14`}
//               style={{ width: '100%', height: '100%' }}
//               title="Mappls Map"
//               allowFullScreen
//             ></iframe>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrafficRouteManagement;



import React, { useState } from 'react';

const TrafficCongestion = () => {
  const [location, setLocation] = useState('');
  const [alternativeRoutes, setAlternativeRoutes] = useState([]);
  const [nearestLocations, setNearestLocations] = useState([]);

  const handleSearch = async () => {
    // Use Mappls API to search for alternative routes and nearest locations
    const apiKey = 'YOUR_MAPPLS_API_KEY'; // Replace with your Mappls API key

    // Example API call to search for places (replace with actual API endpoint)
    const response = await fetch(`https://apis.mappls.com/advancedmaps/v1/${apiKey}/place_search?query=${location}`);
    const data = await response.json();

    // Process the data and set the state
    setAlternativeRoutes(data.alternativeRoutes);
    setNearestLocations(data.nearestLocations);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Traffic Congestion & Disruptions</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Alternative Routes</h2>
        <ul>
          {alternativeRoutes.map((route, index) => (
            <li key={index} className="mt-2">{route}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Nearest Locations</h2>
        <ul>
          {nearestLocations.map((location, index) => (
            <li key={index} className="mt-2">{location}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrafficCongestion;