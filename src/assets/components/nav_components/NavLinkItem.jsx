const NavLinkItem = ({ iconSrc, text, onClick, isActive }) => {
  return (
    <div
      className={`nav-link-item${isActive ? ' active' : ''}`}
      onClick={onClick}
    >
      <img src={iconSrc} alt={text} />
      <p className="nav-link-text">{text}</p>
    </div>
  );
};

export default NavLinkItem;
