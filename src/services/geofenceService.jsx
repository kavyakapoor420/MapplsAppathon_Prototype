import { toast } from 'react-hot-toast';
import { MapPinIcon } from '@heroicons/react/24/outline';

class GeofenceService {
  constructor() {
    this.watchId = null;
    this.events = [];
    this.notifiedEvents = new Set();
    this.geofenceRadius = 5000; // 5km in meters
    this.apiKey = "18daea6d89db814ff7c19493a8a9509c"; // Your Mappls API key
  }

  // Initialize the service with events data
  init(events) {
    this.events = events.filter(event => event.latitude && event.longitude).map(event => ({
      ...event,
      // Convert string coordinates to numbers if needed
      latitude: typeof event.latitude === 'string' ? parseFloat(event.latitude) : event.latitude,
      longitude: typeof event.longitude === 'string' ? parseFloat(event.longitude) : event.longitude
    }));
    
    this.startWatching();
  }

  // Start watching user location
  startWatching() {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(
        this.handlePositionUpdate.bind(this),
        this.handleError.bind(this),
        {
          enableHighAccuracy: true,
          maximumAge: 30000, // 30 seconds
          timeout: 27000 // 27 seconds
        }
      );
    }
  }

  // Stop watching user location
  stopWatching() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  // Handle position updates
  handlePositionUpdate(position) {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;
    
    // Check if user is near any events
    this.events.forEach(event => {
      const distance = this.calculateDistance(
        userLat, userLng,
        event.latitude, event.longitude
      );
      
      // If user is within geofence radius and hasn't been notified yet
      if (distance <= this.geofenceRadius && !this.notifiedEvents.has(event.id)) {
        this.notifyUserAboutEvent(event, distance);
        this.notifiedEvents.add(event.id);
      }
    });
  }

  // Calculate distance between two points using Haversine formula
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance; // in meters
  }

  // Notify user about nearby event
  notifyUserAboutEvent(event, distance) {
    const distanceInKm = (distance / 1000).toFixed(1);
    
    toast(
      (t) => (
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <MapPinIcon className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Event Nearby!</h4>
            <p className="text-sm text-gray-600 mt-1">
              {event.title} is happening {distanceInKm}km from your location.
            </p>
            <button 
              onClick={() => {
                window.location.href = `/events/${event.id}`;
                toast.dismiss(t.id);
              }}
              className="mt-2 text-sm text-primary-600 hover:text-primary-800"
            >
              View Details
            </button>
          </div>
        </div>
      ),
      {
        duration: 8000,
      }
    );
  }

  // Handle errors
  handleError(error) {
    console.error("Geolocation error:", error);
  }
}

export default new GeofenceService(); 