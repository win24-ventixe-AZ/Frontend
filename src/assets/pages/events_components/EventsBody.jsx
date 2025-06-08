import { useEffect, useState } from 'react';
import EventItem from './EventItem';

const EventsBody = ({ filter, searchQuery, onCountsUpdate }) => {
  const [eventList, setEventList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('https://win24ventixe-eventservice-chadcqb0ftbregb8.swedencentral-01.azurewebsites.net/api/Events');
        const data = await res.json();
        const eventsArray = data.result || [];

        const now = new Date();

        const transformed = eventsArray.map(event => {
          const dateObj = new Date(event.eventDate);
          return {
            ...event,
            date: dateObj.toISOString().split('T')[0],
            time: dateObj.toTimeString().slice(0, 5),
            dateObj, // for filtering logic
            isPast: dateObj < now,
            isDraft: event.status === 'Draft' // Draft should be theoretically impossible given my structure.
          };
        });

        setEventList(transformed);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Filter logic
    const filtered = eventList.filter(event => {
      if (filter === 'Active' && (event.isPast || event.isDraft)) return false;
      if (filter === 'Past' && !event.isPast) return false;
      if (filter === 'Draft' && !event.isDraft) return false;

      const query = searchQuery.toLowerCase();
      const match = event.title?.toLowerCase().includes(query) ||
                    event.type?.toLowerCase().includes(query) ||
                    event.location?.toLowerCase().includes(query);

      return match;
    });

    setFilteredList(filtered);

    if (typeof onCountsUpdate === 'function') {
      const active = eventList.filter(e => !e.isPast && !e.isDraft).length;
      const draft = eventList.filter(e => e.isDraft).length;
      const past = eventList.filter(e => e.isPast).length;
      onCountsUpdate({ Active: active, Draft: draft, Past: past });
    }

  }, [filter, searchQuery, eventList, onCountsUpdate]);

  return (
    <div className="events-body">
      {filteredList.length > 0 ? (
        filteredList.map(event => (
          <EventItem key={event.id} {...event} />
        ))
      ) : (
        <div>No events match your criteria.</div>
      )}
    </div>
  );
};

export default EventsBody;
