import { useLocation } from 'react-router-dom';
import UserProfile from './header_components/UserProfile';

const routeTitles = {
  '/events': 'Events',
  '/bookings': 'Bookings',
  '/invoices': 'Invoices',
  '/profile': 'Account Profile',
  '/add-event': 'Event Creation',

};

const Header = () => {
  const { pathname } = useLocation();

  const getTitle = () => {
    if (routeTitles[pathname]) return routeTitles[pathname];
    if (pathname.endsWith('/edit')) return 'Edit Event ';
    if (pathname.startsWith('/events/')) return 'Event Details';
    return 'Unknown';
  };

  return (
    <header className="header">
      <h1 className="header-title">{getTitle()}</h1>
      <UserProfile //Needs to be updated with user info from API
        iconSrc="/images/icons/Profile_Icon.svg"
        firstName="John"
        lastName="Smith"
        role="Admin"
      />
    </header>
  );
};

export default Header;
