import React, { useState } from 'react';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleHeader = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    {expanded? 
      <header className='header'>
        <h1>My Header</h1>
      </header>
        :""}
      <button className={`hamburger ${expanded ? 'expanded' : ''}`} onClick={toggleHeader}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  );
};

export default Header;