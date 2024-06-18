import React, { useState } from 'react';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <aside className={`sidebar ${expanded ? 'expanded' : ''}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        <span className={`dot ${expanded ? 'expanded' : ''}`}></span>
        <span className={`dot ${expanded ? 'expanded' : ''}`}></span>
        <span className={`dot ${expanded ? 'expanded' : ''}`}></span>
      </div>
      {expanded && (
        <nav>
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;