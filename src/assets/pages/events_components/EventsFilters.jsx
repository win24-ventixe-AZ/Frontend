import { useNavigate } from 'react-router-dom';
import FilterButton from './FilterButton';

const EventsFilters = ({ activeFilter, setActiveFilter, searchQuery, setSearchQuery, filterCounts }) => {
  const navigate = useNavigate();

  const filters = [
    { name: 'Active', count: filterCounts.Active || 0 },
    { name: 'Draft', count: filterCounts.Draft || 0 },
    { name: 'Past', count: filterCounts.Past || 0 },
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

      <div className='event-create-container' onClick={() => navigate('/add-event')}>
        <div className='event-create-button'>
          <span>Add Event</span>
        </div>
      </div>

      <div className="events-search-bar">
        <input
          type="text"
          placeholder="Search event"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className='search-icon-container'>
          <img src="/images/icons/MagnifyingGlass.svg" alt="search" />
        </div>
      </div>
    </div>
  );
};


export default EventsFilters;
