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