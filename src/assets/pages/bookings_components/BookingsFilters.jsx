import FilterButton from "../events_components/FilterButton.jsx";


const BookingsFilters = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  statusCounts,
}) => {
  const filters = [
    { name: "Active", count: statusCounts.Active },
    { name: "Draft", count: statusCounts.Draft },
    { name: "Past", count: statusCounts.Past },
  ];

  return (
    <div className="events-filter-container">
      <div className="events-filter-bar">
        {filters.map((filter) => (
          <FilterButton
            key={filter.name}
            name={filter.name}
            count={filter.count}
            isActive={activeFilter === filter.name}
            onClick={() => onFilterChange(filter.name)}
          />
        ))}
      </div>

      <div className="events-search-bar">
        <input
          type="text"
          placeholder="Search event or Booking ID"
          className="search-input"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="search-icon-container">
          <img src="/images/icons/MagnifyingGlass.svg" alt="search" />
        </div>
      </div>
    </div>
  );
};

export default BookingsFilters;
