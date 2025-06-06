const FilterButton = ({name, count, isActive, onClick}) => {
  return (
    <div className={`filter-button ${isActive ? 'selected' : ''}`} onClick={onClick}> 
      {name} 
      <span className="count"> ({count})</span>
      </div>
  )
}
export default FilterButton