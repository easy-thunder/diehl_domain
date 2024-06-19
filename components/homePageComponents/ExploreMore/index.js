import Link from "next/link"
import { useEffect } from 'react';



export default function ExploreMore(){

    useEffect(() => {
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





    return(
        
        <>
        <div className="subTitleContainer">
    <h2 className="exploreMoreSubtitle">EXPLORE MORE</h2>
    </div>
    <div className="exploreMore">




    <div className="exploreMoreCard">
        <div className="exploreMoreCardSide exploreMoreCardSide--front">
          <div className="exploreMoreCardSide__inner">
            <h3 className="subHeader">GAMES</h3>
            <img src="/chess.png" className="exploreMoreCardSide__inner__photo" alt="chess game" />
          </div>
        </div>
        <div className="exploreMoreCardSide exploreMoreCardSide--back">
          <div className="exploreMoreCardSide__inner">
            <h3 className="subHeader">MORE GAMES</h3>
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
        // style={{"grid-column":"span 2"}} 
        className="exploreMoreCard">
            <div className="exploreMoreCardSide exploreMoreCardSide--front">
            <div className="exploreMoreCardSide__inner">
                <h3 className="subHeader">CONTACT</h3>
                <img src="/contact.png" className="exploreMoreCardSide__inner__photo" alt="chess game" />
            </div>
            </div>
            <div className="exploreMoreCardSide exploreMoreCardSide--back">
            <div className="exploreMoreCardSide__inner">
                <h3 className="subHeader">CONTACT</h3>
                <p>Please feel free to contact me at my google voice number: 720-773-1934</p>
                <p>or via email at jddiehl17@gmail.com</p>

            </div>
            </div>
        </div>

























    </div>

    </>
    
    )
}


