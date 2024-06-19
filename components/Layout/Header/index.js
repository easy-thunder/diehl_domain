import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleHeader = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    {expanded? 
      <header className='header'>
        <div className="headerLinkLargeContainer">
          <Link className='headerLinkLarge' href="/">
            <u className='headerLinkLarge'>HOME</u>
          </Link>
          <Link href="/skills">
            <u className='headerLinkLarge'>SKILLS</u>
          </Link>
          <u className='headerLinkLarge'>RESUME</u>
        </div>
        <div className="headerLinkSmallContainer">
          <Link className='headerLinkSmall' href="/static/about-me">
          <u className="headerLinkSmall">My Story  </u>
          </Link>
          <span className='headerSpacers'>|</span>
          <Link className='headerLinkSmall' href="/games">
          <u className="headerLinkSmall">Projects  </u>
          </Link>
          <span className='headerSpacers'>|</span>
          <u className="headerLinkSmall">Contact  </u>

        </div>
        
        

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