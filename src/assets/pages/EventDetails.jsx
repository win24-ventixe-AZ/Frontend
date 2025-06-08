import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventDetailsItem from "./eventDetails_components/EventDetailsItem";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`https://win24ventixe-eventservice-chadcqb0ftbregb8.swedencentral-01.azurewebsites.net/api/Events/${id}`);
        if (!res.ok) throw new Error('Failed to fetch event.');
        const data = await res.json();

        // The API returns { result: {...}, success: true, error: null }
        const eventData = data.result;

        if (!eventData) throw new Error('Event not found.');

        // Convert eventDate to separate date and time strings
        const dt = new Date(eventData.eventDate);
        const date = dt.toISOString().split('T')[0];
        const time = dt.toTimeString().slice(0, 5);

        setEvent({
          id: eventData.id,
          eventType: eventData.type || 'Unknown',
          status: eventData.status || 'Unknown',
          date,
          time,
          name: eventData.title,
          location: eventData.location,
          price: eventData.price,
          description: eventData.description,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading event details...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!event) return <div>No event data found.</div>;

  return (
    <EventDetailsItem
      id={event.id}
      eventType={event.eventType}
      status={event.status}
      date={event.date}
      time={event.time}
      name={event.name}
      location={event.location}
      price={event.price}
      description={event.description}
    />
  );
};

export default EventDetails;
