import React from "react";

const FilterGroup = ({ title, items, filterKey, selectedFilters, onFilterChange }) => {
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let newSelected;
    if (checked) {
      newSelected = [...selectedFilters, value];
    } else {
      newSelected = selectedFilters.filter((item) => item !== value);
    }
    onFilterChange(newSelected);
  };

  return (
    <div className="filter-group">
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                value={item}
                checked={selectedFilters.includes(item)}
                onChange={handleCheckboxChange}
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterGroup;
