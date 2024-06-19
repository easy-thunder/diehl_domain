import Link from "next/link"
import { useEffect, useState, useRef } from 'react';



export default function ExploreMore(){

  const linkedInRef = useRef(null);
  const [length, setLength]= useState(0)
  const contactCardRef = useRef(null);




  useEffect(() => {
      setLength(()=>linkedInRef.current.getTotalLength())
        const cards = document.querySelectorAll('.exploreMoreCard');
    
        cards.forEach(card => {
          card.addEventListener('touchstart', () => {
            card.classList.toggle('is-flipped');
          });
        });
        

    
        return () => {
          cards.forEach(card => {
            card.removeEventListener('touchstart', () => {
              card.classList.toggle('is-flipped');
            });
          });
        };


      }, []);


console.log(length)


    return(
        
        <>
        <div className="subTitleContainer">
    <h2 className="exploreMoreSubtitle">EXPLORE MORE</h2>
    </div>
    <div className="exploreMore">




    <div className="exploreMoreCard">
        <div className="exploreMoreCardSide exploreMoreCardSide--front">
          <div className="exploreMoreCardSide__inner">
            <h3 className="subHeader">PROJECTS</h3>
            <img src="/chess.png" className="exploreMoreCardSide__inner__photo" alt="chess game" />
          </div>
        </div>
        <div className="exploreMoreCardSide exploreMoreCardSide--back">
          <div className="exploreMoreCardSide__inner">
            <h3 className="subHeader">PROJECTS</h3>
            <p>I love games. So building games was an interesting way for me to test my algorithm solving skills while having fun. Note these were not made with styling in mind and with my busy schedule some are not perfect. </p>
            <Link href="/games">
              <p className="exploreMoreLink">Discover More</p>
            </Link>
          </div>
        </div>
      </div>

        <div className="exploreMoreCard">
            <div className="exploreMoreCardSide exploreMoreCardSide--front">
            <div className="exploreMoreCardSide__inner">
                <h3 className="subHeader">MY STORY</h3>
                <img src="/jake fancy.jpg" className="exploreMoreCardSide__inner__photo" alt="chess game" />
            </div>
            </div>
            <div className="exploreMoreCardSide exploreMoreCardSide--back">
            <div className="exploreMoreCardSide__inner">
                <h3 className="subHeader">MY STORY</h3>
                <p> I love solving the puzzles of programming. I have dedicated myself to my craft. I am obsessed with growing in this field and often will be found watching Udemy courses to further hone my skills. </p>
                <Link href="/static/about-me">
                <p className="exploreMoreLink">Discover More</p>
                </Link>
            </div>
            </div>
        </div>

        <div className="exploreMoreCard">
            <div className="exploreMoreCardSide exploreMoreCardSide--front">
            <div className="exploreMoreCardSide__inner">
                <h3 className="subHeader">LEARN</h3>
                <img src="/peopleLearning.png" className="exploreMoreCardSide__inner__photo" alt="chess game" />
            </div>
            </div>
            <div className="exploreMoreCardSide exploreMoreCardSide--back">
            <div className="exploreMoreCardSide__inner">
                <h3 className="subHeader">LEARN</h3>
                <p>One of the greatest ways to learn is to teach. I invite you to explore my coding knowledge. This link will take you to the directory for my blogs on programming. </p>
                <Link href="/skills">
                <p className="exploreMoreLink">Discover More</p>
                </Link>
            </div>
            </div>
        </div>

        {/* <div className="exploreMoreCard">
            <div className="exploreMoreCardSide exploreMoreCardSide--front">
            <div className="exploreMoreCardSide__inner">
                <h3 className="subHeader">SKILLS TIMELINE</h3>
                <img src="/calendar.jpg" className="exploreMoreCardSide__inner__photo" alt="chess game" />
            </div>
            </div>
            <div className="exploreMoreCardSide exploreMoreCardSide--back">
            <div className="exploreMoreCardSide__inner">
                <h3 className="subHeader">SKILLS TIMELINE</h3>
                <p>I've seen a lot of problems in my country. I'm tired of lobbyism. I'm tired of the few making the decisions for the many. I'm tired of vested interests. We can LobbyLess with a direct democracy and technology.</p>
                <Link href="/static/my-dream-project">
                <p className="exploreMoreLink">Discover More</p>
                </Link>
            </div>
            </div>
        </div> */}

        <div 
        className="exploreMoreCard" ref={contactCardRef}>
            <div className="exploreMoreCardSide exploreMoreCardSide--front">
            <div className="exploreMoreCardSide__inner">
                <h3 className="subHeader">CONTACT</h3>
                <img src="/contact.png" className="exploreMoreCardSide__inner__photo" alt="chess game" />

            </div>
            </div>
            <div className="exploreMoreCardSide exploreMoreCardSide--back">
            <div className="exploreMoreCardSide__inner">
                <h3 className="subHeader">CONTACT</h3>
                <p>My google voice number: 720-773-1934</p>
                <p>email at jddiehl17@gmail.com</p>
                <a href="https://www.linkedin.com/in/jake-diehl/" >

                <svg className="linkedInSVG" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                  <path ref={linkedInRef}  d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 14 11.011719 C 12.904779 11.011719 11.919219 11.339079 11.189453 11.953125 C 10.459687 12.567171 10.011719 13.484511 10.011719 14.466797 C 10.011719 16.333977 11.631285 17.789609 13.691406 17.933594 A 0.98809878 0.98809878 0 0 0 13.695312 17.935547 A 0.98809878 0.98809878 0 0 0 14 17.988281 C 16.27301 17.988281 17.988281 16.396083 17.988281 14.466797 A 0.98809878 0.98809878 0 0 0 17.986328 14.414062 C 17.884577 12.513831 16.190443 11.011719 14 11.011719 z M 14 12.988281 C 15.392231 12.988281 15.94197 13.610038 16.001953 14.492188 C 15.989803 15.348434 15.460091 16.011719 14 16.011719 C 12.614594 16.011719 11.988281 15.302225 11.988281 14.466797 C 11.988281 14.049083 12.140703 13.734298 12.460938 13.464844 C 12.78117 13.19539 13.295221 12.988281 14 12.988281 z M 11 19 A 1.0001 1.0001 0 0 0 10 20 L 10 39 A 1.0001 1.0001 0 0 0 11 40 L 17 40 A 1.0001 1.0001 0 0 0 18 39 L 18 33.134766 L 18 20 A 1.0001 1.0001 0 0 0 17 19 L 11 19 z M 20 19 A 1.0001 1.0001 0 0 0 19 20 L 19 39 A 1.0001 1.0001 0 0 0 20 40 L 26 40 A 1.0001 1.0001 0 0 0 27 39 L 27 29 C 27 28.170333 27.226394 27.345035 27.625 26.804688 C 28.023606 26.264339 28.526466 25.940057 29.482422 25.957031 C 30.468166 25.973981 30.989999 26.311669 31.384766 26.841797 C 31.779532 27.371924 32 28.166667 32 29 L 32 39 A 1.0001 1.0001 0 0 0 33 40 L 39 40 A 1.0001 1.0001 0 0 0 40 39 L 40 28.261719 C 40 25.300181 39.122788 22.95433 37.619141 21.367188 C 36.115493 19.780044 34.024172 19 31.8125 19 C 29.710483 19 28.110853 19.704889 27 20.423828 L 27 20 A 1.0001 1.0001 0 0 0 26 19 L 20 19 z M 12 21 L 16 21 L 16 33.134766 L 16 38 L 12 38 L 12 21 z M 21 21 L 25 21 L 25 22.560547 A 1.0001 1.0001 0 0 0 26.798828 23.162109 C 26.798828 23.162109 28.369194 21 31.8125 21 C 33.565828 21 35.069366 21.582581 36.167969 22.742188 C 37.266572 23.901794 38 25.688257 38 28.261719 L 38 38 L 34 38 L 34 29 C 34 27.833333 33.720468 26.627107 32.990234 25.646484 C 32.260001 24.665862 31.031834 23.983076 29.517578 23.957031 C 27.995534 23.930001 26.747519 24.626988 26.015625 25.619141 C 25.283731 26.611293 25 27.829667 25 29 L 25 38 L 21 38 L 21 21 z"></path>
                </svg>
                </a>
                <a href="https://github.com/easy-thunder">

                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
                  <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
                </svg>
                </a>

            </div>
            </div>
        </div>

























    </div>

    </>
    
    )
}


