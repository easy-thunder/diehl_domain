import Link from "next/link";

export default function MyDreamProject() {
  return (
    <div className="individualSkillContainer">
      <div className="timeline">
        <div className="timeline-event">
          <div className="timeline-content">
            <div className="event">
            <h2>Events</h2>

              <h3>June 2022</h3>
              <p>Started learning C++</p>
              <br />
              <h3>November 2022</h3>
              <p>Started at FlatIron School</p>
              <br/>
              <br/>
              <br/>
              <h3>april 2023</h3>
              <p>Graduation from flatIron</p>

            </div>
            <div className="skills">
            <h2>What I learned</h2>
              <div className="skill">
                <p>Gained an understanding of Pointers and references</p>
                <p>Understood the speed advantages that the stack has over heap</p>
                <p>Began learning about encapsulation and polymorphism </p>
              </div>
              <div className="skill">
                <p>Began the journey for css HTML and vanilla JavaScript</p>
                <p>Opened the doors to react and ruby on rails for full stack engineering</p>
                <p>Worked with many technologies including sinatra, Bcrypt, rails scaffolding.</p>
                <p>Built projects with nodemailer, faker, validations and learned how to error handle.</p>
                <p>created logins with json web tokens.</p>
                
              </div>
              <div className="skill">
                <p>Began taking udemy classes. Got proficient with next.js, serverside rendering  and swr</p>
                <p>Educated self further with socket.io, svg masking, and chrome extensions</p>
                <p>I became proficient with using document.querySelector to webScrape information from Linkedin. </p>
     
                
              </div>
            </div>
          </div>
          <div className="timeline-line"></div>
        </div>
      </div>

      <Link href="/">
        <button className="backButton">Back to Home</button>
      </Link>
    </div>
  );
}