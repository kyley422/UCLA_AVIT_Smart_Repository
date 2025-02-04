import React, { useState } from "react";
import "./styles.css";
import FilterGroup from "./FilterGroup";

function App() {
  const [activeTab, setActiveTab] = useState("pending");

  // Sample data for demonstration
  const criticalUpdates = [
    {
      date: "08/24/2024",
      brand: "Denon",
      model: "AVR-S750H",
      version: "5.00",
      description: "HDMI 2.1 / 8K Compatibility Fixes",
      devicesAffected: 5,
      size: "512 MB"
    },
    {
      date: "09/16/2024",
      brand: "Marantz",
      model: "SR5015",
      version: "6.02",
      description: "HDMI 2.1 Chipset Update",
      devicesAffected: 20,
      size: "20 KB"
    },
    {
      date: "10/06/2024",
      brand: "Yamaha",
      model: "RX-V4A",
      version: "2.2",
      description: "Network Security & System Stability",
      devicesAffected: 16,
      size: "4 MB"
    },
    {
      date: "11/28/2024",
      brand: "Onkyo",
      model: "TX-NR696",
      version: "11.1",
      description: "Works with Sonos / Chromecast",
      devicesAffected: 12,
      size: "2 MB"
    },
    {
      date: "12/25/2024",
      brand: "Pioneer",
      model: "VSX-934",
      version: "0.7",
      description: "MCACC Pro Calibration Updates",
      devicesAffected: 3,
      size: "50 MB"
    },
    {
      date: "01/01/2025",
      brand: "Sony",
      model: "STR-DH790",
      version: "9.5",
      description: "Firmware to Support Latest Audio Formats",
      devicesAffected: 2,
      size: "100 MB"
    }
  ];

  const majorUpdates = [
    // Same structure, different data
    {
      date: "08/24/2024",
      brand: "Denon",
      model: "AVR-S750H",
      version: "5.00",
      description: "HDMI 2.1 / 8K Compatibility Fixes",
      devicesAffected: 5,
      size: "512 MB"
    },
    {
      date: "09/16/2024",
      brand: "Marantz",
      model: "SR5015",
      version: "6.02",
      description: "HDMI 2.1 Chipset Update",
      devicesAffected: 20,
      size: "20 KB"
    },
    // ...
  ];

  const minorUpdates = [
    // Similar structure...
  ];

  const renderUpdatesTable = (title, data) => (
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
              <td>{item.date}</td>
              <td>{item.brand}</td>
              <td>{item.model}</td>
              <td>{item.version}</td>
              <td>{item.description}</td>
              <td>{item.devicesAffected}</td>
              <td>{item.size}</td>
              <td>
                <button className="push-button">↓</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Depending on which tab is active, render different sections
  const renderTabContent = () => {
    if (activeTab === "pending") {
      return (
        <>
          {/* Pending tab content */}
          {renderUpdatesTable(`Critical Updates (${criticalUpdates.length} Pending)`, criticalUpdates)}
          {renderUpdatesTable(`Major Updates (${majorUpdates.length} Pending)`, majorUpdates)}
          {/* You could similarly render Minor Updates here */}
        </>
      );
    } else if (activeTab === "completed") {
      return <div>Completed Updates will be listed here...</div>;
    }
    // ... additional tabs if needed
    return null;
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <img src="https://logos-world.net/wp-content/uploads/2021/11/University-of-California-Los-Angeles-UCLA-Emblem.png" alt="UCLA Logo" />
          <span>UCLA AV/IT Services</span>
        </div>
        <div className="header-center">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        </div>
        <div className="header-right">
          <div className="profile-section">
            {/* Could place a user avatar icon here */}
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
            items={["Denon", "Marantz", "Onkyo", "Pioneer", "Yamaha", "Sony"]}
          />

          <FilterGroup
            title="Device Type"
            items={["Amplifier", "Projector", "Receiver", "Speaker"]}
          />

          <FilterGroup
            title="Location"
            items={["Boelter Hall", "Dining Halls", "Luskin Center", "The Hill"]}
          />
        </aside>

        {/* Updates Section */}
        <section className="updates-section">
          <section className="updates-header">
            {/* Tabs */}
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

            {/* Action Buttons */}
            {activeTab === "pending" && (
              <div className="push-all-buttons">
                <button className="push-critical">Downlad Critical (48)</button>
                <button className="push-major">Download Major (24)</button>
                <button className="push-minor">Download Minor (152)</button>
                <button className="push-all">Download All</button>
              </div>
            )}
            </section>

            {/* Conditionally Render Table/Content */}
            <div className="updates-table-wrapper">{renderTabContent()}</div>
        </section>
      </div>
    </div>
  );
}

export default App;
