const UserProfile = ({ iconSrc, firstName, lastName, role }) => {
  return (
    <div className="userProfile-container">

      <div className="userProfile-icon">
        <img src={iconSrc} alt="user" />
      </div>

      <div className="userProfile-text-container">
        <div className="userProfile-name">{firstName} {lastName}</div>
        <div className="userProfile-role">{role}</div>
      </div>

    </div>
  )
}
export default UserProfile