import BookingsBody from "./bookings_components/BookingsBody.jsx"
import BookingsFilters from "./bookings_components/BookingsFilters.jsx"

const Bookings = () => {
  return (
    <div id="bookings">
      
      {/* This is using the same filter CSS as Events; some slight differences only*/}
      <BookingsFilters />

      <BookingsBody />

    </div>
  )
}
export default Bookings