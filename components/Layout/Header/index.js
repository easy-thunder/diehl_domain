import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  const [shouldScroll, setShouldScroll] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const toggleHeader = () => {
    setExpanded(!expanded);
  };


  useEffect(() => {
    const handleRouteChangeComplete = () => {
      if (shouldScroll) {
        const documentHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const offset = documentHeight - viewportHeight + (viewportHeight / 2);
        
        window.scrollTo({
          top: offset - viewportHeight,
          behavior: 'smooth',
        });

        setShouldScroll(false); // Reset the flag
      }
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [shouldScroll, router.events]);

  const scrollToContactCard = () => {
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const offset = documentHeight - viewportHeight + (viewportHeight / 2);

    if (router.pathname !== '/') {
      setShouldScroll(true);
      router.push('/');
    } else {
      window.scrollTo({
        top: offset - viewportHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
    {expanded? 
      <header className='header'>
        <div className="headerLinkLargeContainer">
          <Link className='headerLinkLarge' href="/">
            <b className='headerLinkLarge'>HOME</b>
          </Link>
          <Link className='headerLinkLarge' href="/skills">
            <b className='headerLinkLarge'>SKILLS</b>
          </Link>

        </div>
        <div className="headerLinkSmallContainer">
          <Link className='headerLinkSmall' href="/static/about-me">
          <b className="headerLinkSmall">About  </b>
          </Link>
          <span className='headerSpacers'>|</span>
          <Link className='headerLinkSmall' href="/games">
          <b className="headerLinkSmall">Projects  </b>
          </Link>
          <span className='headerSpacers'>|</span>
          <b onClick={scrollToContactCard} className="headerLinkSmall">Contact </b>


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