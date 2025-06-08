import BookingsItem from "./BookingsItem";

const BookingsBody = ({ bookings, loading, error }) => {
  if (loading) return <div className="loading">Loading bookings...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="bookingsbody">
      <div className="bookings-grid header">
        <div>Booking ID</div>
        <div>Date & Time</div>
        <div>Event</div>
        <div>Quantity</div>
        <div>Price</div>
        <div>Status</div>
      </div>

      {bookings.map((event) => (
        <BookingsItem
          key={event.bookingId}
          {...event}
        />
      ))}
    </div>
  );
};

export default BookingsBody;
