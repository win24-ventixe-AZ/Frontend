import { Route, Routes } from 'react-router-dom'
import './App.css'
import CenterLayout from './assets/layouts/CenterLayout'
import PortalLayout from './assets/layouts/PortalLayout'
import Login from './assets/pages/Login'
import SignUp from './assets/pages/SignUp'
import Events from './assets/pages/Events'
import EventDetails from './assets/pages/EventDetails'
import Bookings from './assets/pages/Bookings'
import Invoices from './assets/pages/Invoices'
import AccountProfile from './assets/pages/AccountProfile'
import AddEvent from './assets/pages/AddEvent'
import EditEvent from './assets/pages/EditEvent'
import BookEvent from './assets/pages/BookEvent'

function App() {

  return (
    <Routes>

      <Route element={<CenterLayout/>}  >
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>

      <Route element={<PortalLayout/>}  >
        <Route path='/events' element={<Events />} />
        <Route path='/add-event' element={<AddEvent />} />
        <Route path='/events/:id' element={<EventDetails/>} />
        <Route path='/events/:id/book' element={<BookEvent/>} />
        <Route path='/events/:id/edit' element={<EditEvent/>} />
        <Route path='/bookings' element= {<Bookings/>} />
        <Route path='/invoices' element= {<Invoices/>} /> 
        <Route path='/profile' element= {<AccountProfile/>} />
      </Route>
    
    </Routes>
  )
}

export default App
