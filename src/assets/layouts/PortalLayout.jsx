import { Outlet } from "react-router-dom"
import Nav from '../components/Nav'
import Header from '../components/Header'
import Footer from '../components/Footer'

const PortalLayout = () => {
  return (
    <div className="portal-wrapper">
      <Header />
      <Nav />
      <main>
          <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PortalLayout