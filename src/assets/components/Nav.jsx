import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavLinkItem from './nav_components/NavLinkItem';

const routeTitles = {
  '/events': 'Events',
  '/events/:id': 'Event Details',
  '/bookings': 'Bookings',
  '/invoices': 'Invoices',
  '/add-event': 'Event Creation',

};

const navItems = [
  { path: '/events', icon: '/images/icons/Events.svg', label: 'Events' },
  { path: '/bookings', icon: '/images/icons/Bookings.svg', label: 'Bookings' },
  // { path: '/invoices', icon: '/images/icons/Invoices.svg', label: 'Invoices' },
];

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const getTitle = () => {
    const { pathname } = location;
    if (routeTitles[pathname]) return routeTitles[pathname];
    if (pathname.endsWith('/edit')) return 'Edit Event ';
    if (pathname.startsWith('/events/')) return 'Event Details';
    return 'Unknown';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  return (
    <nav id="nav">
      <div className="nav-container-normal">
        <div className="nav-title-container" onClick={() => handleNavigate('/events')}>
          <img src="/images/logos/Ventixe-Logo.svg" alt="logo" />
          <p className="nav-logo-text">Ventixe</p>
        </div>

        <div className="nav-links-container">
          {navItems.map(({ path, icon, label }) => (
            <NavLinkItem
              key={path}
              iconSrc={icon}
              text={label}
              onClick={() => handleNavigate(path)}
              isActive={
                location.pathname === path ||
                (path === '/events' && location.pathname.startsWith('/events/'))
              }
            />
          ))}
        </div>
      </div>

      <div className="nav-mobile-wrapper" ref={dropdownRef}>
        <div className="nav-container-mobile">
          <img src="/images/logos/Ventixe-Logo.svg" alt="logo" />
          <p>{getTitle()}</p>
          <img
            src="/images/icons/Button-Icon.svg"
            alt="dropdown"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          />
        </div>

        {isDropdownOpen && (
          <div className="nav-dropdown">
            {navItems.map(({ path, icon, label }) => (
              <NavLinkItem
                key={path}
                iconSrc={icon}
                text={label}
                onClick={() => handleNavigate(path)}
                isActive={
                  location.pathname === path ||
                  (path === '/events' && location.pathname.startsWith('/events/'))
                }
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
