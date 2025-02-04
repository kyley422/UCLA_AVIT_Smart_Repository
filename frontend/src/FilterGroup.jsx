// FilterGroup.js
import React, { useState } from "react";
import "./styles.css";

function FilterGroup({ title, items }) {
  // Whether the dropdown is expanded
  const [open, setOpen] = useState(true);

  return (
    <div className="filter-group">
      {/* Header with clickable area to open/close */}
      <div className="filter-group-header" onClick={() => setOpen(!open)}>
        <h4>{title}</h4>
        <span className="toggle-icon">{open ? "−" : "+"}</span>
      </div>

      {/* Only render checkbox list if open is true */}
      {open && (
        <div className="filter-group-content">
          {items.map((item) => (
            <label key={item} className="filter-item">
              <input type="checkbox" /> {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterGroup;