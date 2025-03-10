import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import MapPage from './pages/MapPage';
import { mockEvents } from './utils/mockData';
import geofenceService from './services/geofenceService';

function App() {
  useEffect(() => {
    // Initialize geofencing with mock events
    geofenceService.init(mockEvents);
    
    // Clean up when component unmounts
    return () => {
      geofenceService.stopWatching();
    };
  }, []);

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:id" element={<EventDetailPage />} />
          <Route path="map" element={<MapPage />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
