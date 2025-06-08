import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const EventDetailsItem = ({
  id,
  eventType,
  status,
  name,
  date,
  time,
  location,
  price,
  description
}) => {
  const navigate = useNavigate();
  const [termsContent, setTermsContent] = useState('');

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch(
          'https://win24ventixe-boilerplateservice-acc8a4hvchbegfct.swedencentral-01.azurewebsites.net/api/Boilerplates?type=Terms'
        );

        if (!response.ok) throw new Error('Failed to fetch terms');

        const data = await response.json();
        setTermsContent(data[0]?.boilerplateContent || 'Terms and conditions are currently unavailable.');
      } catch (error) {
        console.error('Error loading terms:', error);
        setTermsContent('Terms and conditions are currently unavailable.');
      }
    };

    fetchTerms();
  }, []);

  const handleEditClick = () => {
    navigate(`/events/${id}/edit`);
  };

  const handleBookNowClick = () => {
    navigate(`/events/${id}/book`);
  };

  return (
    <div id="eventDetails">
      <div className="eventdetails-container">
        <div className="eventdetails-image">
          <div className="event-image-tags">
            <div className="tag-event-type">{eventType}</div>
            <div className={`tag-event-${status.toLowerCase()}`}>
              <span className="bullet">• </span>
              {status}
            </div>
          </div>
        </div>

        <div className="eventdetails-description">
          <div className="eventdetails-name-container">
            <div className="eventdetails-name">{name}</div>
            <div className="eventdetails-edit-button" onClick={handleEditClick}>
              Edit
            </div>
          </div>

          <div className="eventdetails-date">
            <img src="/images/icons/CalendarDot.svg" alt="date" />
            {date} | {time}
          </div>

          <div className="eventdetails-location-container">
            <div className="eventdetails-location">
              <img src="/images/icons/MapPin.svg" alt="map" />
              {location}
            </div>

            <hr className="eventdetails-divider-top" />

            <div className="eventdetails-price-container">
              <div className="eventdetails-book-button" onClick={handleBookNowClick}>
                Book Now
              </div>
              <div className="eventdetails-price">${price}</div>
            </div>
          </div>

          <div className="eventdetails-about-container">
            <hr className="eventdetails-divider-bottom" />
            <div className="eventdetails-about-title">About Event</div>
            <div className="eventdetails-about-content">{description}</div>
          </div>
        </div>
      </div>

      <div className="terms-container">
        <ReactMarkdown>{termsContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default EventDetailsItem;
