import React, { useState, useEffect } from "react";
import "./styles.css";
import FilterGroup from "./FilterGroup";

function App() {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    brand: [],
    deviceType: [],
    location: [],
  });
  const [updatesData, setUpdatesData] = useState({
    criticalUpdates: [],
    majorUpdates: [],
    minorUpdates: [],
  });

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch("http://localhost:5222/devices");
        const data = await response.json();
        console.log("Fetched data:", data); // Debug log

        // Separate updates into categories based on severity
        const criticalUpdates = data.filter(
          (item) => item.severity === "critical"
        );
        const majorUpdates = data.filter((item) => item.severity === "major");
        const minorUpdates = data.filter((item) => item.severity === "minor");

        console.log("Critical Updates:", criticalUpdates); // Debug log
        console.log("Major Updates:", majorUpdates); // Debug log
        console.log("Minor Updates:", minorUpdates); // Debug log

        setUpdatesData({ criticalUpdates, majorUpdates, minorUpdates });
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    fetchUpdates();
  }, []);

  // Filter updates based on search query and selected filter options
  const filterUpdates = (updates) => {
    console.log("Filtering updates:", updates); // Debug log
    return updates.filter((item) => {
      // Search bar filtering (case-insensitive, checks brand, model, and description)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          (item.manufacturer &&
            item.manufacturer.toLowerCase().includes(query)) ||
          (item.model && item.model.toLowerCase().includes(query)) ||
          (item.description && item.description.toLowerCase().includes(query));
        if (!matchesSearch) {
          return false;
        }
      }
      // Filter by Brand
      if (
        selectedFilters.brand.length > 0 &&
        item.manufacturer &&
        !selectedFilters.brand.includes(item.manufacturer)
      ) {
        return false;
      }
      // Filter by Device Type
      if (
        selectedFilters.deviceType.length > 0 &&
        item.deviceType &&
        !selectedFilters.deviceType.includes(item.deviceType)
      ) {
        return false;
      }
      // Filter by Location
      if (
        selectedFilters.location.length > 0 &&
        item.location &&
        !selectedFilters.location.includes(item.location)
      ) {
        return false;
      }
      return true;
    });
  };

  // Renders a table for the provided updates data with a title header
  const renderUpdatesTable = (title, data) => {
    console.log(`Rendering table for ${title}`, data); // Debug log
    return (
      <div className="updates-table-container">
        <h3>{title}</h3>
        <table className="updates-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Version No.</th>
              <th>Description</th>
              <th>Devices Affected</th>
              <th>Size</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.date || "NA"}</td>
                <td>{item.manufacturer}</td>
                <td>{item.model}</td>
                <td>{item.updateFirmwareVersion}</td>
                <td>{item.description || "NA"}</td>
                <td>{item.devicesAffected || "NA"}</td>
                <td>{item.size || "NA"}</td>
                <td>
                  <button className="push-button">↓</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render updates content based on active tab and filtered data
  const renderTabContent = () => {
    if (activeTab === "pending") {
      return (
        <>
          {renderUpdatesTable(
            `Critical Updates (${
              filterUpdates(updatesData.criticalUpdates).length
            } Pending)`,
            filterUpdates(updatesData.criticalUpdates)
          )}
          {renderUpdatesTable(
            `Major Updates (${
              filterUpdates(updatesData.majorUpdates).length
            } Pending)`,
            filterUpdates(updatesData.majorUpdates)
          )}
          {renderUpdatesTable(
            `Minor Updates (${
              filterUpdates(updatesData.minorUpdates).length
            } Pending)`,
            filterUpdates(updatesData.minorUpdates)
          )}
        </>
      );
    } else if (activeTab === "completed") {
      return <div>Completed Updates will be listed here...</div>;
    }
    return null;
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <img
            src="https://logos-world.net/wp-content/uploads/2021/11/University-of-California-Los-Angeles-UCLA-Emblem.png"
            alt="UCLA Logo"
          />
          <span>UCLA AV/IT Services</span>
        </div>
        <div className="header-center">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="header-right">
          <div className="profile-section">
            <h3>IT Administrator</h3>
            <h5>Last Updated: 00:00 PST 01/01/2025</h5>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="main-content">
        {/* Side Filter Panel */}
        <aside className="side-filter">
          <h2>Filter</h2>
          <FilterGroup
            title="Brand"
            filterKey="brand"
            items={["Denon", "Marantz", "Onkyo", "Pioneer", "Yamaha", "Sony"]}
            selectedFilters={selectedFilters.brand}
            onFilterChange={(selected) =>
              setSelectedFilters((prev) => ({ ...prev, brand: selected }))
            }
          />
          <FilterGroup
            title="Device Type"
            filterKey="deviceType"
            items={["Amplifier", "Projector", "Receiver", "Speaker"]}
            selectedFilters={selectedFilters.deviceType}
            onFilterChange={(selected) =>
              setSelectedFilters((prev) => ({ ...prev, deviceType: selected }))
            }
          />
          <FilterGroup
            title="Location"
            filterKey="location"
            items={[
              "Boelter Hall",
              "Dining Halls",
              "Luskin Center",
              "The Hill",
            ]}
            selectedFilters={selectedFilters.location}
            onFilterChange={(selected) =>
              setSelectedFilters((prev) => ({ ...prev, location: selected }))
            }
          />
        </aside>

        {/* Updates Section */}
        <section className="updates-section">
          <section className="updates-header">
            <div className="tabs">
              <button
                className={activeTab === "pending" ? "active" : ""}
                onClick={() => setActiveTab("pending")}
              >
                Pending
              </button>
              <button
                className={activeTab === "completed" ? "active" : ""}
                onClick={() => setActiveTab("completed")}
              >
                Completed
              </button>
            </div>
            {activeTab === "pending" && (
              <div className="push-all-buttons">
                <button className="push-critical">Download Critical</button>
                <button className="push-major">Download Major</button>
                <button className="push-minor">Download Minor</button>
                <button className="push-all">Download All</button>
              </div>
            )}
          </section>
          <div className="updates-table-wrapper">{renderTabContent()}</div>
        </section>
      </div>
    </div>
  );
}

export default App;