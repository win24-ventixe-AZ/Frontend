import BookingsItem from "./BookingsItem"


const BookingsBody = () => {

  const eventList = [
    {
      eventId: "abc123",
      bookingId: 'abc123',
      type: 'Outdoor & Adventure',
      status: 'Active',
      date: '5/6/2029',
      time: "12:00",
      name: 'Adventure Gear Show',
      location: 'Rocky Ridge Exhibition Hall, Denver, CO',
      price: '40',
    },
    {
      eventId: "abc223",
      bookingId: 'abc223',
      type: 'Outdoor & Adventure',
      status: 'Past',
      date: '5/6/2029',
      time: "12:00",
      name: 'Adventure Gear Show',
      location: 'Rocky Ridge Exhibition Hall, Denver, CO',
      price: '40',
    },
    {
      eventId: "abc323",
      bookingId: 'abc323',
      type: 'Outdoor & Adventure',
      status: 'draft',
      date: '5/6/2029',
      time: "12:00",
      name: 'Adventure Gear Show',
      location: 'Rocky Ridge Exhibition Hall, Denver, CO',
      price: '40',
    },
    {
      eventId: "abc423",
      bookingId: 'abc423',
      type: 'Outdoor & Adventure',
      status: 'Active',
      date: '5/6/2029',
      time: "12:00",
      name: 'Adventure Gear Show',
      location: 'Rocky Ridge Exhibition Hall, Denver, CO',
      price: '40',
    },
    // more events loaded in with API 
  ];

  return (
    <div className="bookingsbody">
      <div className="bookings-grid header">
        <div>Booking ID</div>
        <div>Date & Time</div>
        <div>Event</div>
        <div>Price</div>
        <div>Status</div>
      </div>

      {eventList.map(event => (
        <BookingsItem
          key={event.bookingId}
          bookingId={event.bookingId}
          eventId={event.eventId}
          type={event.type}
          status={event.status}
          date={event.date}
          time={event.time}
          eventName={event.name}
          price={event.price}
        />
      ))}
    </div>
  )
}

export default BookingsBody
