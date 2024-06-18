import Link from "next/link";

export default function MyDreamProject() {
  return (
    <div className="individualSkillContainer">
      <div className="individualSkillInner">
        <h2 className="individualSkillTitle">My Skills Timeline</h2>
        
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-item-content">
              <span className="timeline-item-date">2015</span>
              <h3 className="timeline-item-title">Event 1</h3>
              <p className="timeline-item-description">
                Description of Event 1.
              </p>
              <ul className="timeline-item-skills">
                <li>Skill A</li>
                <li>Skill B</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-item-content">
              <span className="timeline-item-date">2017</span>
              <h3 className="timeline-item-title">Event 2</h3>
              <p className="timeline-item-description">
                Description of Event 2.
              </p>
              <ul className="timeline-item-skills">
                <li>Skill C</li>
                <li>Skill D</li>
              </ul>
            </div>
          </div>

          {/* Add more timeline items as needed */}
        </div>

        <Link href="/">
          <button className="backButton">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}