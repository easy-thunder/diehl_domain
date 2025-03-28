import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Header = () => {
  const { data: session,status } = useSession();
  console.log("Header status: ", status);
  const isAuthenticated = status === 'authenticated';
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
        top: offset - viewportHeight+150,
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
          <Link className='headerLinkLarge' href="/games">
            <b className="headerLinkLarge">Projects  </b>
          </Link>
          <Link className='headerLinkLarge' href="/static/about-me">
            <b className="headerLinkLarge">About  </b>
          </Link>

        </div>
        <div className="headerLinkSmallContainer">

        <Link className='headerLinkSmall' href="/static/about-me">
            {isAuthenticated?<b className="headerLinkSmall">Sign out  </b>:<b className="headerLinkSmall">Log in  </b>}
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