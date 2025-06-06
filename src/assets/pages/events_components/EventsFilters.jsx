import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FilterButton from './FilterButton';



const EventsFilters = () => {
  const [activeFilter, setActiveFilter] = useState('Active');
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  

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
          
        <div className='event-create-container' onClick={() => handleNavigate('/add-event')}>
          <div className='event-create-button'>
            <span>Add Event</span>
          </div>
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
export default EventsFilters