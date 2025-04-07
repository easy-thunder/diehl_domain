import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Modal from '@/components/utility/Modal/Modal';
import AuthForm from '@/components/utility/Forms/AuthForm/AuthForm';
import { useUser } from '@/context/UserContext';
import { supabase } from "@/lib/supaBase/supabaseClient";

const Header = () => {
  const [shouldScroll, setShouldScroll] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [displayLogInModal, setDisplayLogInModal] = useState(false);
  const router = useRouter();

  const {user} = useUser()
  const isAuthenticated = !!user?.aud;
  

  const toggleHeader = () => {
    setExpanded(!expanded);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };


  const handleLogInModal = () => {
    setDisplayLogInModal((displayLogInModalPrev)=>!displayLogInModalPrev);
  }

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

            {isAuthenticated?<b onClick={()=>handleLogout()} className="headerLinkSmall">Sign out  </b>:<b onClick={()=>handleLogInModal()} className="headerLinkSmall">Log in  </b>}


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
      {displayLogInModal && <Modal component={ <AuthForm /> } setModal={ ()=>handleLogInModal()}/>}
    </>
  );
};

export default Header;