import { useNavigate } from 'react-router-dom';

const BookingsItem = ({
  eventId,
  bookingId,
  type,
  status,
  date,
  time,
  eventName,
  price,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="bookings-grid" onClick={handleClick}>
      <div className="primary">{bookingId}</div>
      <div>
        <div className="primary">{date}</div>
        <div className="secondary">{time}</div>
      </div>
      <div>
        <div className="primary">{eventName}</div>
        <div className="secondary">{type}</div>
      </div>
      <div>${price}</div>
      <div className={`tag-event-${status.toLowerCase()}`}>
        <span className="bullet">• </span>
        {status}
      </div>
    </div>
  )
}

export default BookingsItem
