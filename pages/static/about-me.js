import Link from "next/link";

export default function AboutMe() {
  return (
    <div className="individualSkillContainer">
      <div className="individualSkillInner">
        <h2 className="individualSkillTitle">About Me</h2>
        <p className="individualSkillParagraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
        </p>
        <p className="individualSkillParagraph">
          Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        </p>
        <div className="individualSkillTags">
          <span className="individualSkillTag">Tag1</span>
          <span className="individualSkillTag">Tag2</span>
        </div>
        <Link href="/">
          <button className="backButton">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}