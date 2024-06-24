import { useRouter } from "next/router";
import Link from "next/link";
// import { useEffect, useState } from "react";
import useS3Bucket from "@/hooks/api/useS3Bucket";
export default function IndividualSkill() {
  const router = useRouter();
  const { individualSkill } = router.query;
  // const [skillsData, setSkillsData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);


  // useEffect(() => {
  //   const fetchSkillsData = async () => {
  //     try {
  //       const response = await fetch('/data/skills.json');
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch skills data");
  //       }
  //       const data = await response.json();
  //       setSkillsData(data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSkillsData();
  // }, []);

  const apiEndpoint = "/api/aws/get-presigned-url";
  const bucketName = "diehl-domain-data";
  const objectKey = "skillsData.json";

  const { data: skillsData, loading, error } = useS3Bucket(apiEndpoint, bucketName, objectKey);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Ensure skillsData is available before trying to find the skill
  if (!skillsData) return <div>No data available</div>;
  console.log(skillsData.skillsData)

  const skill = skillsData.skillsData.find(skill => skill.id === individualSkill);

  if (!skill) return <div>Skill not found</div>;

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

