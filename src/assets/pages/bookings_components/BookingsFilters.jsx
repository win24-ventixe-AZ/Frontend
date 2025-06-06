import { useState } from 'react';
import FilterButton from '../events_components/FilterButton.jsx';




const BookingsFilters = () => {
  const [activeFilter, setActiveFilter] = useState('Active');


    const filters = [ // Will likely be handled by an API action to get the right statuses, counts need to be updated based on database info
    { name: 'Active', count: 0 },
    { name: 'Draft', count: 0 },
    { name: 'Past', count: 0 },
  ];

  return (
      <div className="events-filter-container">
        <div className="events-filter-bar">
          {filters.map((filter) => (
            <FilterButton 
              key={filter.name}
              name={filter.name}
              count={filter.count}
              isActive={activeFilter === filter.name}
              onClick={() => setActiveFilter(filter.name)}
            />
          ))}
        </div>

        <div className="events-search-bar">
          <input
            type="text"
            placeholder="Search event"
            className="search-input"
          />
          <div className='search-icon-container'>
            <img src="/images/icons/MagnifyingGlass.svg" alt="search" />
          </div>
        </div>
      </div>
  )
}
export default BookingsFilters