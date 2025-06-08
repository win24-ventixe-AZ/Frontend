import { useEffect, useState } from "react";
import BookingsFilters from "./bookings_components/BookingsFilters.jsx";
import BookingsBody from "./bookings_components/BookingsBody.jsx";

const BOOKINGS_API = "https://win24ventixe-bookingservice-gcaghxbsbnd8cgg4.swedencentral-01.azurewebsites.net/api/Bookings";
const EVENT_API = "https://win24ventixe-eventservice-chadcqb0ftbregb8.swedencentral-01.azurewebsites.net/api/Events";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusCounts, setStatusCounts] = useState({ Active: 0, Draft: 0, Past: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsRes = await fetch(BOOKINGS_API);
        const bookingsData = await bookingsRes.json();
        if (!bookingsData.success) throw new Error("Failed to fetch bookings");

        const enrichedBookings = await Promise.all(
          bookingsData.result.map(async (booking) => {
            const eventRes = await fetch(`${EVENT_API}/${booking.eventId}`);
            const eventData = await eventRes.json();
            if (!eventData.success) throw new Error("Failed to fetch event");

            const event = eventData.result;
            const eventDateObj = new Date(event.eventDate);

            const formattedDate = eventDateObj.toISOString().split("T")[0];
            const formattedTime = eventDateObj.toTimeString().slice(0, 5);

            return {
              bookingId: booking.id,
              eventId: booking.eventId,
              type: event.type,
              status: event.status,
              date: formattedDate,
              time: formattedTime,
              eventName: event.title,
              ticketQuantity: booking.ticketQuantity,
              price: (event.price * booking.ticketQuantity).toFixed(2),
            };
          })
        );

        setBookings(enrichedBookings);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const filtered = bookings.filter((b) => {
      const matchesFilter = b.status === activeFilter;
      const query = searchQuery.toLowerCase();

      const matchesSearch =
        b.eventName.toLowerCase().includes(query) ||
        b.bookingId.toString().includes(query); 

      return matchesFilter && matchesSearch;
    });

    const counts = {
      Active: bookings.filter((b) => b.status === "Active").length,
      Draft: bookings.filter((b) => b.status === "Draft").length,
      Past: bookings.filter((b) => b.status === "Past").length,
    };

    setFilteredBookings(filtered);
    setStatusCounts(counts);
  }, [bookings, activeFilter, searchQuery]);


  return (
    <div id="bookings">
      <BookingsFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusCounts={statusCounts}
      />
      <BookingsBody
        bookings={filteredBookings}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Bookings;
