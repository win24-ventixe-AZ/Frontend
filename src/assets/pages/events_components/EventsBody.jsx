import EventItem from './EventItem';

const EventsBody = () => {
  const eventList = [
    {
      id: 'abc123',
      type: 'Outdoor & Adventure',
      status: 'Active',
      date: 'June 5, 2029',
      time: '20:00',
      name: 'Adventure Gear Show',
      location: 'Rocky Ridge Exhibition Hall, Denver, CO',
      price: '40',
    },
    // will be handled by the API but fetched in this manner. This is how things will look
  ];

  return (
    <div className="events-body">
      {eventList.map((event) => (
        <EventItem
          key={event.id}
          {...event} 
        />
      ))}
    </div>
  );
};

export default EventsBody;
