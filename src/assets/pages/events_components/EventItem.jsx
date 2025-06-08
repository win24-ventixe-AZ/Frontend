import { useNavigate } from 'react-router-dom';

const EventItem = ({
  id,
  type,
  status,
  date,
  time,
  title,
  location,
  price,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${id}`);
  };

  return (
    <div className="event-item" onClick={handleClick}>
      <div className="event-image">
        <div className="event-image-tags">
          <div className="tag-event-type">{type}</div>
          <div className={`tag-event-${status.toLowerCase()}`}>
            <span className="bullet">• </span>
            {status}
          </div>
        </div>
      </div>

      <div className="event-description">
        <div className="event-description-date">
          <img src="/images/icons/CalendarDot.svg" alt="date" />
          {date} | {time}
        </div>
        <div className="event-description-name">{title}</div>
        <div className="event-description-location">
          <img src="/images/icons/MapPin.svg" alt="map" />
          <p>{location}</p>
        </div>
        <div className="event-description-price">${price}</div>
      </div>
    </div>
  );
};

export default EventItem;
