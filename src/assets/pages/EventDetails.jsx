import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import EventDetailsItem from "./eventDetails_components/EventDetailsItem"

const EventDetails = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    // TODO: Replace with real API call
    const mockEvent = {
      id,
      eventType: "Concert",
      status: "Active", // or "Past"
      date: "2025-07-01",
      time: "20:00",
      name: "Summer Beats Festival",
      location: "123 Music Ave, Cityville",
      price: 39.99,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nulla quasi facilis quisquam reprehenderit neque eligendi esse! Sint, perferendis laboriosam quae rerum debitis sed, odit iste placeat atque mollitia aspernatur beatae, ullam obcaecati. Possimus, consectetur! Optio architecto dolorum deserunt beatae hic ut, fuga perspiciatis, laudantium, quo itaque veniam qui sint!Sint, perferendis laboriosam quae rerum debitis sed, odit iste placeat atque mollitia aspernatur beatae, ullam obcaecati. Possimus, consectetur! Optio architecto dolorum deserunt beatae hic ut, fuga perspiciatis, laudantium, quo itaque veniam qui sint!Sint, perferendis laboriosam quae rerum debitis sed, odit iste placeat atque mollitia aspernatur beatae, ullam obcaecati. Possimus, consectetur! Optio architecto dolorum deserunt beatae hic ut, fuga perspiciatis, laudantium, quo itaque veniam qui sint!"
    }

    setEvent(mockEvent)
  }, [id])

  if (!event) return <div>Loading event details...</div>

  return (

    <EventDetailsItem id={id}
                      eventType={event.eventType} 
                      status={event.status}
                      date={event.date}
                      time={event.time}
                      name={event.name}
                      location={event.location}
                      price={event.price}
                      description={event.description}/> 

  )
}

export default EventDetails
