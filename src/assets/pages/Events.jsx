import { useState } from 'react';
import EventsFilters from './events_components/EventsFilters';
import EventsBody from './events_components/EventsBody';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('Active');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCounts, setFilterCounts] = useState({ Active: 0, Draft: 0, Past: 0 });

  return (
    <div id="events">
      <EventsFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterCounts={filterCounts}
      />

      <EventsBody
        filter={activeFilter}
        searchQuery={searchQuery}
        onCountsUpdate={setFilterCounts}
      />
    </div>
  );
};

export default Events;
