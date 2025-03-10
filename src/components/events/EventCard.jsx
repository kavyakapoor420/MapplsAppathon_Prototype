import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, UserGroupIcon, ClockIcon } from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const EventCard = ({ event }) => {
  const {
    id,
    title,
    description,
    image,
    date,
    time,
    location,
    organizer,
    category,
    attendees,
  } = event;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card hover className="h-full flex flex-col">
      <div className="relative">
        <img
          src={image || 'https://via.placeholder.com/400x200?text=Event+Image'}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={getCategoryVariant(category)}>{category}</Badge>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="h-5 w-5 mr-2 text-primary-500" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <ClockIcon className="h-5 w-5 mr-2 text-primary-500" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="h-5 w-5 mr-2 text-primary-500" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <UserGroupIcon className="h-5 w-5 mr-2 text-primary-500" />
            <span>{attendees} attendees</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-0 mt-auto">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">By {organizer}</span>
          <Link to={`/events/${id}`}>
            <Button variant="primary" size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </Card>
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

export default EventCard; 