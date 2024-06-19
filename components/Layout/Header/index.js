import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleHeader = () => {
    setExpanded(!expanded);
  };

  const scrollToContactCard = () => {
    const documentHeight = document.documentElement.scrollHeight;
    console.log(documentHeight)
    const viewportHeight = window.innerHeight;
    console.log(viewportHeight)
    const offset = documentHeight - viewportHeight + (viewportHeight / 2);
    console.log(offset)
    window.scrollTo({
      top: offset-viewportHeight,
      behavior: 'smooth',
    });
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

          <a href="/JD_SWENG_RES.pdf" download="/JD_SWENG_RES.pdf">
              <u className='headerLinkLarge'>RESUME</u>
          </a>

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
          <u onClick={scrollToContactCard} className="headerLinkSmall">Contact </u>


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