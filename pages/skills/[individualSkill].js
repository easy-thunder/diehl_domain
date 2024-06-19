import { useRouter } from "next/router";
import Link from "next/link";
import skillsData from "@/data/skillsData";

export default function IndividualSkill() {
  const router = useRouter();
  const { individualSkill } = router.query;
  const skill = skillsData.find(skill => skill.id === individualSkill);
  
  if (!skill) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="individualSkillContainer">
      <div className="individualSkillInner">
        <h2 className="individualSkillTitle">{skill.title}</h2>
        {skill.paragraphs.map((paragraph, index) => (
          <div key={index} className="individualSkillParagraph">
            {paragraph.startsWith("```") ? (
              <pre>
                <code>{paragraph.replace(/```/g, "")}</code>
              </pre>
            ) : (
              paragraph.startsWith("###") ?
              (
                <b>{paragraph.replace(/###/g, "")}</b>) :
                (
                    paragraph.startsWith("&&&")?
                    <div className="imageContainer">

                    <img className="imageContainer__photo" src={paragraph.replace(/&&&/g,"")} />
                    </div>
                        :
                <p>{paragraph}</p>
                )
            )}
          </div>
        ))}
        <div className="individualSkillTags">
          {skill.tags.map((tag, index) => (
            <span key={index} className="individualSkillTag">{tag}</span>
          ))}
        </div>
        <Link href="/skills">
          <button className="backButton">Back to Skills</button>
        </Link>
      </div>
    </div>
  );
}