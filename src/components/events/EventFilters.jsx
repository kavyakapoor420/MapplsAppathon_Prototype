import React from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';

const EventFilters = ({ 
  filters, 
  setFilters, 
  categories,
  onApplyFilters,
  className = '' 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [localFilters, setLocalFilters] = React.useState(filters);

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value,
    });
  };

  const handleCategoryChange = (category) => {
    if (localFilters.categories.includes(category)) {
      setLocalFilters({
        ...localFilters,
        categories: localFilters.categories.filter(c => c !== category),
      });
    } else {
      setLocalFilters({
        ...localFilters,
        categories: [...localFilters.categories, category],
      });
    }
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
    if (onApplyFilters) {
      onApplyFilters(localFilters);
    }
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      search: '',
      categories: [],
      date: '',
      location: '',
      sortBy: 'date',
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
    if (onApplyFilters) {
      onApplyFilters(resetFilters);
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Events</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleFilters}
          className="flex items-center"
        >
          <FunnelIcon className="h-4 w-4 mr-1" />
          Filters
        </Button>
      </div>

      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Filter Events</h3>
            <button 
              onClick={toggleFilters}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                name="search"
                value={localFilters.search}
                onChange={handleFilterChange}
                placeholder="Search events..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      localFilters.categories.includes(category)
                        ? 'bg-primary-100 text-primary-800 border-primary-200 border'
                        : 'bg-gray-100 text-gray-800 border-gray-200 border hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={localFilters.date}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={localFilters.location}
                onChange={handleFilterChange}
                placeholder="Enter location..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Sort By */}
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sortBy"
                name="sortBy"
                value={localFilters.sortBy}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="date">Date (Newest First)</option>
                <option value="dateAsc">Date (Oldest First)</option>
                <option value="name">Name (A-Z)</option>
                <option value="nameDesc">Name (Z-A)</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            <div className="flex justify-between pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResetFilters}
              >
                Reset Filters
              </Button>
              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleApplyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventFilters; 